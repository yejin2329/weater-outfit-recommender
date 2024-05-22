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
        cold: { type: String },
        hot: { type: String },
        rainy: { type: String }
    },
    weatherSensitivity: {
        coldSensitive: { type: Boolean },
        heatSensitive: { type: Boolean },
        windSensitive: { type: Boolean }
    }
})

const User=mongoose.model('User', userSchema);

module.exports=User; 