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
    }
})

const User=mongoose.model('User', userSchema);

module.exports=User;