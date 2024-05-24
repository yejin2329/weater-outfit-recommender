const mongoose = require('mongoose');
const User = require('./User'); 
const bcrypt=require('bcrypt');
const {v4:uuidv4}=require('uuid');
require('dotenv').config({ path: '../.env' });



console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

async function createUser() {
    try {
        const hashedPassword=await bcrypt.hash('testPassword2',10)
        const newUser = new User({
            username: 'testUser2',
            email:'testuser@example.com',
            userId:uuidv4(),
            password: hashedPassword
        });

        await newUser.save();
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

createUser();
