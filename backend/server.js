const cors=require('cors');
const express = require('express');
const crypto=require('crypto');
const nodemailer=require('nodemailer');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User=require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //for parsing application/json
app.use(cors());
//mongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
  console.log('MongoDB connected successfully');
})

mongoose.connection.on('error', (err)=>{
  console.error('MongoDB connection error:', err);
  process.exit(1);
})

mongoose.connection.on('disconnected', ()=>{
  console.log('MongoDB disconnected, attempting to reconnect..');
  //attempt to reconnect
  mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//function for weather API
async function fetchWeather(lat,lon){
  const apiKey='';
  const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try{
    const response=await fetch(url);
    const data=await response.json();
    return data;
  }catch(error){
    console.error('Failed to fetch weather data:',error);
    throw error;
  }
}

//fetch weather data
app.get('/weather', async(req,res)=>{
  const{_id}=req.query;
  try{
    const user=await User.findById(_id)
    if(user&&user.defaultLocation){
      const weatherData=await fetchWeather(user.defaultLocation.latitude, user.defaultLocation.longitude)
      res.json(weatherData);
    }else{
      res.status(404).send("User or location not found");
    }
  }catch(error){
    console.error("Error fetching weather:",error)
    res.status(500).send("Error fetching weather")
  }
})

//fetch user preferences
app.get('/api/users/preferences/:_id', async (req, res) =>{
  const { _id } = req.params;
    try {
      const user=await User.findById(_id);
      if(!user){
        console.log('User not found:', _id)
        return res.status(404).send('User not found')
      }

      res.json({
        preferences:user.preferences || {},
      city:user.city || "Default city or null"
    });
}catch(error){
  console.error('Failed to fetch preferences:',error);
  res.status(500).send('Server error');
}
})

//login
app.post('/login', async(req,res)=>{
  const {username, password}=req.body;
  console.log('Received login request for username:', username)
  try{
    const user=await User.findOne({username})
    if(!user){
      return res.status(401).json({message:"Login failed!"});
    }
    //verify password
    const isMatch=await bcrypt.compare(password, user.password);
    if(isMatch){
      console.log('Password match, login successful');
      res.status(200).json({message:"Login successful!", _id:user._id, username:user.username})
    }else{
      console.log('Password mismatch, login failed');
      res.status(401).json({message:"Login failed!"})
    }
  }catch(error){
    console.error("Login error:", error);
    res.status(500).json({message:"Server error during login."})
  }
 
})

//validate password
function validatePassword(password) {
  return password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
}

//register
app.post('/register', async(req,res)=>{
  const{username, password}=req.body;
  
  //password validation
  if(!validatePassword(password)){
      return res.status(400).json({message:"Password must be at least 6 characters long, include at least one number and one uppercase letter."})
  }

  //hash password
  try{
  const hashedPassword=await bcrypt.hash(password,10);

  //new user instance and save in database
  const newUser=new User({
    username:username,
    password:hashedPassword
  })
  //save the new user to the database
  await newUser.save();
  
  res.status(200).json({message:"Registration successful!",_id: newUser._id})
}catch(error){
  if(error.code===11000){
    //handle duplicate key
    return res.status(400).json({message:"User already exists"})
  }
  console.error("Registration error:", error)
  res.status(500).json({message: "Error registering the user."});
}
})

//email
let transporter=nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
})

app.post('/forgot-password', async(req,res)=>{
  const {email}=req.body;
  const user=await User.findOne({email:email})
  if(!user){
    return res.status(404).send('No account with this email address exists.')
  }
  //generate token
  const token= crypto.randomBytes(20).toString('hex');

  //set token and expiry in database
  user.resetPasswordToken=token;
  user.resetPasswordExpires=Date.now()+3600000;
  await user.save();

  //send email
  let mailOptions = {
    from: 'yourgmail@gmail.com',
    to: 'recipient@example.com',
    subject: 'Sending Email using Node.js',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.'
          
  };

  transporter.sendMail(mailOptions, function(error,info){
    if(error){
      console.log(error)
    }
    else{
      console.log('Email sent: '+ info.response);
    }
  })
})

app.post('/api/users/preferences', async(req,res)=>{
  //debug
  console.log("Received Update Request: ", req.body)
  const {_id, preferences, sensitivity, city}=req.body;

  console.log(`Updating user Id ${_id} with preferences: ${JSON.stringify(preferences)}, sensitivity: ${JSON.stringify(sensitivity)}, city: ${city}`)
  
  const updateData={
    'clothingPreferences.cold':preferences.cold,
    'clothingPreferences.hot':preferences.hot,
    'clothingPreferences.rainy':preferences.rainy,
    'weatherSensitivity.coldSensitive':sensitivity.coldSensitivity,
    'weatherSensitivity.heatSensitive':sensitivity.heatSensitivity,
    'weatherSensitivity.windSensitive':sensitivity.windSensitivity,
    'defaultCity':req.body.city
  }

  //console.log("Update Data to be applied:", updateData)
  
  try{
    //find user by userId and updates preferences
    const updatedUser=await User.findByIdAndUpdate(
      _id,
      {$set:updateData},
      {new:true, runValidators:true}
    )

    console.log("User after update:", updatedUser);

    if(updatedUser){
      res.json({message:"Preferences and city updated successfully!", updatedUser});
    }else{
      res.status(404).send("User not found");
    }
  }catch(error){
    console.error("Error updating preferences and city:", error);
    res.status(500).send("Error updating preferences and city");
  }
  
})

/*
app.post('/api/users/update-city', async (req, res) =>{
  const{_id, city}=req.body;

  console.log('REceived city update request for:', {_id, city})

  try{
    const updatedUser=await User.findByIdAndUpdate(_id,
     { $set:{
        defaultCity:city
      }
    },{new:true,runValidators:true });
    console.log("User after update:", updatedUser)
    
    if(updatedUser){
        console.log("User after update:", updatedUser)
        res.json({message:"City updated successfully",updatedUser})
      }else{
        console.log('No user found with the provided ID:', _id)
        res.status(404).send("User not found");
      }
    }catch(error){
      console.error("Error updating city:", error);
      res.status(500).send("Error updating city");
    }
  
}) */
/*
app.post('/api/users/update-location', async(req,res)=>{
  const{userId, latitude, longitude}=req.body;

  //debug statement
  console.log('Received location update request:', {userId, latitude, longitude})

  try{
    const updatedUser=await User.findByIdAndUpdate(userId,{
      $set:{
      'defaultLocation.latitude':latitude,
      'defaultLocation.longitude':longitude
      }
    }, {new:true, runValidators:true});
    console.log("User after update:",updatedUser);

    if(updatedUser){
      
      res.json({message:"Location updated successfully", updatedUser})
    }else{
      console.log('No user found with the provided ID:', userId)
      res.status(404).send("User not found")
    }
  }catch(error){
    console.error("Error updating location:", error);
    res.status(500).send("Error updating location");
  }
})
*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
