const express = require('express');
const router = express.Router();
const { addReservation, getReservations, deleteReservation, updateReservation } = require('../controllers/ReservationsController');

router.post('/create/', addReservation);
router.get('/', getReservations);
router.delete('/delete/:id', deleteReservation);
router.put('/update/:id', updateReservation);

module.exports = router;