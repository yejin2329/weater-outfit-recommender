const mongoose = require('mongoose');
const User = require('./User'); 

require('dotenv').config({ path: '../.env' });



console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

async function createUser() {
    try {
        const newUser = new User({
            userId: 'testUser',
            password: 'testPassword123'
        });

        await newUser.save();
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

createUser();
