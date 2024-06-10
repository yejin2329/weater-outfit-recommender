const mongoose = require('mongoose');
const User = require('./User'); 
const bcrypt=require('bcrypt');

require('dotenv').config({ path: '../.env' });



console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

async function createUser() {
    console.log("Attempting to create user...");
    try {
        const hashedPassword=await bcrypt.hash('testPassword3',10)
        const newUser = new User({
            username: 'testUser3',
            email:'testuser3@example.com',
            password: hashedPassword,
            clothingPreferences:{
                cold:"Heavy Coat",
                hot:"T-shirt",
                rainy:"RainCoat"
            },
            weatherSensitivity:{
                coldSensitive:false,
                heatSensitive:false,
                windSensitive:false
            },
            defaultLocation:null
        });

        await newUser.save();
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        console.log(error);
    }
}

createUser();
