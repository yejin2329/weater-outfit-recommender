const mongoose=require('mongoose');

//user schema
const userSchema=new mongoose.Schema({
    username:{
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
        cold:  {type:String , default:'Heavy Coat'},
        hot: {type:String , default:'T-shirt'},
        rainy: {type:String, default:'Raincoat'} 
    },
    weatherSensitivity: {
        coldSensitive:  {type:Boolean, default:false},
        heatSensitive: {type:Boolean, default: false},
        windSensitive: {type:Boolean, default:false} 
    },
    defaultLocation: {type:String, default:''},
})

const User=mongoose.model('User', userSchema);

module.exports=User; 