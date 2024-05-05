const express = require('express');
//const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // for parsing application/json

//mongoDB Connection
//mongoose.connect(process.env.MONGODB_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true
//})
//.then(() => console.log('MongoDB connected successfully'))
//.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req,res)=>{
  const {userId, password}=req.body;
  if(authenticate(userId, password)){
    res.status(200).json({message:"Login successful!"})
  }else{
    res.status(401).json({message:"Login failed!"})
  }
})

function authenticate(userId, password){
  //logic

  return true;
}
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
