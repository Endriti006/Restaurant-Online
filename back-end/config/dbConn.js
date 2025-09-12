const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        return Promise.resolve();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        return Promise.reject(err);
    }
};

module.exports = connectDB;
