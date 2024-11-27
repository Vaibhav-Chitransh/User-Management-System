const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

// RBAC Middleware
const authorize = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log(token);

        if(!token) return res.status(403).json({message: 'Access denied. No token provided.'});

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded);
            const user = await User.findById(decoded.userId);

            if(!user) return res.status(404).json({message: 'User not found'});

            if(roles.length && !roles.includes(user.role)) return res.status(403).json({message: 'Access denied. Insufficient Permissions'});

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Invalid token.'});
        }
    }
}

module.exports = {authorize};