require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cors = require('cors');
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use('/meals', require('./routes/meals'));
app.use('/users', require('./routes/users'));
app.use('/reservations', require('./routes/reservations'));
app.use('/syslogs', require('./routes/syslog'));

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
