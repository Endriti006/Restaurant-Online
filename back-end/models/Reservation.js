const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false          // This must be false, not true
    },
    userFullname: {
        type: String,
        required: true,
        default: 'Guest'
    },
    tableNumber: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    specialRequests: String,
    contactEmail: String,        // optional guest contact
    contactPhone: String         // optional guest contact
});

module.exports = mongoose.model('Reservation', reservationSchema);