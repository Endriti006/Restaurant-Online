const Reservation = require('../models/Reservation');
const User = require('../models/User');
const { createSyslog } = require('./SyslogsController');

// Add a new reservation
const addReservation = async (req, res) => {
    const { userId, userFullname, date, time, guests, specialRequests, contactEmail, contactPhone } = req.body;

    try {
        let finalFullname = userFullname;
        let resolvedUserId = userId || null;

        // If a userId is provided, try to resolve it; otherwise treat as guest
        if (resolvedUserId) {
            let user = null;
            // Basic ObjectId format guard (24 hex chars)
            if (/^[a-fA-F0-9]{24}$/.test(resolvedUserId)) {
                user = await User.findById(resolvedUserId);
            }
            if (user) {
                finalFullname = user.fullName;
            } else {
                // Fallback to guest if user not found
                resolvedUserId = null;
            }
        }

        // Ensure we have a guest name if no valid user
        if (!resolvedUserId) {
            if (!finalFullname || !finalFullname.trim()) {
                return res.status(400).json({ message: 'Guest name is required for anonymous reservation' });
            }
        }

        if (!date || !time || !guests) {
            return res.status(400).json({ message: 'Date, time and guests are required' });
        }

        const reservationCount = await Reservation.countDocuments({ date, time });
        if (reservationCount >= 20) {
            return res.status(400).json({ message: 'No more tables available for this timeslot' });
        }

        const latestReservation = await Reservation.findOne({ date, time }).sort({ tableNumber: -1 });
        const tableNumber = latestReservation ? latestReservation.tableNumber + 1 : 1;

        const newReservation = new Reservation({
            userId: resolvedUserId,          // may be null for guests
            userFullname: finalFullname,
            tableNumber,
            date,
            time,
            guests,
            specialRequests,
            contactEmail,
            contactPhone
        });

        await newReservation.save();

        // Only create syslog for authenticated users
        if (resolvedUserId) {
            await createSyslog(resolvedUserId, finalFullname, 'Reservations', 'Created');
        }

        return res.status(201).json({ message: 'Reservation created successfully!', reservation: newReservation });
    } catch (error) {
        console.error('Reservation creation error:', error);
        return res.status(500).json({ message: 'Failed to create reservation', error: error.message });
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
