const Reservation = require('../models/Reservation');
const User = require('../models/User');
const { createSyslog } = require('./SyslogsController');

// Add a new reservation
const addReservation = async (req, res) => {
    const { userId, date, time, guests, specialRequests } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userFullname = user.fullName;

        const reservationCount = await Reservation.countDocuments({ date, time });

        if (reservationCount >= 20) {
            return res.status(400).json({ message: 'No more tables available for this timeslot' });
        }

        const latestReservation = await Reservation.findOne({ date, time }).sort({ tableNumber: -1 });

        let tableNumber = 1;
        if (latestReservation) {
            tableNumber = latestReservation.tableNumber + 1;
        }

        const newReservation = new Reservation({
            userId,
            userFullname,
            tableNumber,
            date,
            time,
            guests,
            specialRequests
        });

        await newReservation.save();

        // Create a syslog entry
        await createSyslog(userId, userFullname,'Reservations', 'Created');

        res.status(201).json({ message: 'Reservation created successfully!', reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create reservation', error });
    }
};

// Get all reservations
const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reservations', error });
    }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Create a syslog entry
        await createSyslog(reservation.userId, reservation.userFullname,'Reservations', 'Deleted');

        res.status(200).json({ message: 'Reservation deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete reservation', error });
    }
};

// Update a reservation by ID
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { tableNumber, date, time, guests, specialRequests } = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { tableNumber, date, time, guests, specialRequests },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Create a syslog entry
        await createSyslog(updatedReservation.userId, updatedReservation.userFullname,'Reservations', 'Updated');

        res.status(200).json({ message: 'Reservation updated successfully!', reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update reservation', error });
    }
};

module.exports = {
    addReservation,
    getReservations,
    deleteReservation,
    updateReservation
};
