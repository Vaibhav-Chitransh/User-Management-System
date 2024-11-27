const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Editor', 'Viewer'],
        default: 'Viewer'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
}, {timestamps: true});  // Keeping timestamps to automatically add createdAt and updatedAt fields


// Hashing password before saving it to database
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {  
        this.password = await bcrypt.hash(this.password, 10); 
    }
    next();
})

// Method to compare hashed password during login
userSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;