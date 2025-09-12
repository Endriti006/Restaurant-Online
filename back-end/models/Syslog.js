const mongoose = require('mongoose');

const syslogSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },

    controllerName: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    action: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Syslog', syslogSchema);
