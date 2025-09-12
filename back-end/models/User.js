const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
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
        enum: ['Client', 'Staff', 'Admin'],
        default: 'Client'
    },
    phone: Number,
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
