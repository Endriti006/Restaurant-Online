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

// Add a root route to check if server is running
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

// Routes
app.use('/meals', require('./routes/meals'));
app.use('/users', require('./routes/users'));
app.use('/reservations', require('./routes/reservations'));
app.use('/syslogs', require('./routes/syslog'));

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Modified server startup to ensure it starts even with DB issues
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
connectDB()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Server running without database connection');
  });
