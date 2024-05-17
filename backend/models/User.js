const mongoose=require('mongoose');

//user schema
const userSchema=new mongoose.Schema({
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
    }
})

const User=mongoose.model('User', userSchema);

module.exports=User; 