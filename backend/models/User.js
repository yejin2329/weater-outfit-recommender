const mongoose=require('mongoose');

//user schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    clothingPreferences: {
        cold:  String ,
        hot: String ,
        rainy: String 
    },
    weatherSensitivity: {
        coldSensitive:  Boolean,
        heatSensitive: Boolean,
        windSensitive: Boolean 
    },
    defaultLocation: {
        latitude: Number,
        longitude: Number
      }
})

const User=mongoose.model('User', userSchema);

module.exports=User; 