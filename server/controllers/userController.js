const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error fetching users'});
    }
}

const signupUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User already exists'});

        const newUser = new User({username, email, password});
        await newUser.save();

        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.SECRET_KEY,
            { expiresIn: '1h' }

        );

        res.json({token, user: {id: user._id, email: user.email, role: user.role}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = User.findOne({ $or: [{ email }, { username }] });
        if(existingUser) return res.status(400).json({message: 'User already exists'});

        const user = new User({username, email, password, role});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({message: 'Error creating user'});
    }
}

const updateUser = async (req, res) => {
    try {
        const {username, email, password, role, status} = req.body;

        const existingUser = User.findOne({$or: [{username}, {email}]});

        if(existingUser && existingUser._id.toString() !== req.params.id) {
            return res.status(400).json({message: 'User with same email or username already exists'});
        }

        if(password) {
            req.body.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, {
            username, email, role, status, password: req.body.password
        }, {new : true});

        if(!user) return res.status(404).json({message: 'User not found'});
    } catch (error) {
        res.status(500).json({message: 'Error updating user'});
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const loggedInUserId = req.user.id;

        if(userId === loggedInUserId) res.status(400).json({message: 'Admins cannot delete themselves'});

        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting user'});
    }
}

const updateRole = async (req, res) => {
    try {
        const {role} = req.body;
        const userId = req.params.id;
        const loggedInUserId = req.user.id;

        if(userId === loggedInUserId) {
            return res.status(400).json({message: 'Admins cannot update their own role'});
        }
        if(!['Admin', 'Editor', 'Viewer'].includes(role)) return res.status(400).json({message: 'Invalid role'});

        const user = await User.findByIdAndUpdate(req.params.id, {role}, {new: true});

        if(!user) return res.status(404).json({message: 'User not found'});

        res.status(200).json({message: 'Role updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error updating role'});
    }
}

module.exports = {getUsers, signupUser, loginUser, createUser, updateUser, deleteUser, updateRole};