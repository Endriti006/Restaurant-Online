import React, { useState, useEffect } from 'react';

export default function Reservations() {
    const [reservations, setReservations] = useState([]);

    // Hardcoded API URL for your Railway deployment
    const API_URL = 'https://discerning-spirit-production.up.railway.app';

    const fetchReservations = async () => {
        try {
            const response = await fetch(`${API_URL}/reservations/`);
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleInputChange = (e, reservationId, field) => {
        const updatedReservations = reservations.map(reservation => {
            if (reservation._id === reservationId) {
                return { ...reservation, [field]: e.target.innerText };
            }
            return reservation;
        });
        setReservations(updatedReservations);
    };

    const handleEdit = async (reservationId) => {
        if (window.confirm("Are you sure you want to edit this reservation?")) {
            const reservation = reservations.find(res => res._id === reservationId);
            try {
                const response = await fetch(`${API_URL}/reservations/update/${reservationId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tableNumber: reservation.tableNumber,
                        date: reservation.date,
                        time: reservation.time,
                        guests: reservation.guests,
                        specialRequests: reservation.specialRequests
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to edit reservation');
                }
                console.log('Reservation edited successfully');
                fetchReservations();  // Refresh the reservation list after editing
            } catch (error) {
                console.error('Error editing reservation:', error);
            }
        }
    };

    const handleDelete = async (reservationId) => {
        if (window.confirm("Are you sure you want to delete this reservation?")) {
            try {
                const response = await fetch(`${API_URL}/reservations/delete/${reservationId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    const errorData = await response.json();  // Capture the error message from the server
                    throw new Error(errorData.message || 'Failed to delete reservation');
                }

                console.log('Reservation deleted successfully');
                fetchReservations();  // Refresh the reservation list after deletion
            } catch (error) {
                console.error('Error deleting reservation:', error);
                alert(`Failed to delete reservation: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div>
            <div className='title'>
                <h2>Reservation List</h2>
            </div>
            
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>UserID</th>
                        <th>Guest Name</th>
                        <th>Table Number</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Special Requests</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation._id}>
                            <td>{reservation._id}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'userId')}>{reservation.userId}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'userFullname')}>{reservation.userFullname}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'tableNumber')}>{reservation.tableNumber}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'date')}>
                                {new Date(reservation.date).toISOString().split('T')[0]}
                            </td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'time')}>{reservation.time}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'guests')}>{reservation.guests}</td>
                            <td contentEditable onBlur={(e) => handleInputChange(e, reservation._id, 'specialRequests')}>{reservation.specialRequests}</td>
                            <td>
                                <button onClick={() => handleEdit(reservation._id)}>Edit</button>
                                <button onClick={() => handleDelete(reservation._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
