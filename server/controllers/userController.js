const User = require('../models/userModel.js');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User already exists'});

        const newUser = new User({username, email, password});
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {getUsers, addUser};