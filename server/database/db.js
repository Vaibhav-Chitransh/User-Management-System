const mongoose = require('mongoose');
const User = require('../models/userModel.js');

const createDefaultAdmin = async () => {
    const adminExists = await User.findOne({role : 'Admin'});

    if(!adminExists) {
        const defaultAdmin = new User({
            username: 'admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'Admin',
            status: 'Active'
        });

        await defaultAdmin.save();
        console.log('Default admin created');
    } else {
        console.log('Admin already exists');
    }
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await createDefaultAdmin();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;