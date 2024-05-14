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

//login
app.post('/login', async(req,res)=>{
  const {userId, password}=req.body;
  console.log('Received login request for userId:', userId)
  try{
    const user=await User.findOne({userId})
    if(!user){
      return res.status(401).json({message:"Login failed!"});
    }
    //verify password
    const isMatch=await bcrypt.compare(password, user.password);
    if(isMatch){
      console.log('Password match, login successful');
      res.status(200).json({message:"Login successful!", userId:user.userId})
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
  const{userId, password}=req.body;
  
  //password validation
  if(!validatePassword(password)){
      return res.status(400).json({message:"Password does not meet complexity requirements."})
  }

  //hash password
  try{
  const hashedPassword=await bcrypt.hash(password,10);

  //new user instance and save in database
  const newUser=new User({
    userId,
    password:hashedPassword
  })
  //save the new user to the database
  await newUser.save();
  
  res.status(200).json({message:"Registration successful!"})
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
