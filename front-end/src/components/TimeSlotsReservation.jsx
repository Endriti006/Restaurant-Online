import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function TimeSlotsReservation({ onClose, selectedSlot, selectedDate, onTriggerLogin, guests }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [noTablesMessage, setNoTablesMessage] = useState(''); // State to handle no table availability message
    const [showDialog, setShowDialog] = useState(true); // State to manage dialog visibility
    const navigate = useNavigate();

    // Format the selectedDate
    const formattedDate = new Date(selectedDate).toLocaleString('default', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const handleReserveNow = async () => {
        const userSession = localStorage.getItem('userSession');

        if (userSession) {
            try {
                const response = await fetch('https://discerning-spirit-production.up.railway.app/reservations/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userSession, // Pass only the user ID, backend handles fetching the full name
                        date: selectedDate,
                        time: selectedSlot.time,
                        guests: guests,
                        specialRequests: ""
                    })
                });

                if (response.ok) {
                    setShowDialog(false);  // Hide the dialog
                    setShowConfirmation(true); // Show confirmation popup
                } else if (response.status === 400) {
                    const data = await response.json();
                    setNoTablesMessage(data.message); // Set the no table availability message
                    setShowDialog(false); // Hide the reservation dialog
                } else {
                    console.error("Failed to create reservation");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            onTriggerLogin(); // Trigger login from NavBar
            onClose(); // Close reservation dialog
        }
    };

    return (
        <div className="reservation-container">
            {showDialog && ( // Render the dialog only if `showDialog` is true
                <div className="reservation-dialog">
                    <div className="dialog-content">
                        <div className="dialog-header">
                            <svg height="20" viewBox="0 0 20 20" width="20"><path d="m12.4696699 2.46966991c.2928932-.29289321.767767-.29289321 1.0606602 0 .2662665.26626657.2904726.68293025.0726181.97654174l-.0726181.08411844-6.4693301 6.46966991 6.4693301 6.4696699c.2662665.2662666.2904726.6829303.0726181.9765418l-.0726181.0841184c-.2662666.2662665-.6829303.2904726-.9765418.0726181l-.0841184-.0726181-6.99999999-7c-.26626656-.2662666-.29047261-.68293026-.07261815-.97654175l.07261815-.08411844z" fill-rule="evenodd"></path></svg>
                            <div className="dialog-header-right">
                                <button className="close-button" onClick={onClose}>×</button>
                            </div>
                        </div>
                        <h2>Complete Your Reservation</h2>
                        <h3>Samite Gastro Bar (Monasty Hotel)</h3>
                        <p>
                            <span className="icon">🗓</span> {formattedDate} {selectedSlot.time}
                        </p>
                        <p>
                            <span className="icon">👥</span> {guests} {guests === 1 ? 'Guest' : 'Guests'}, {selectedSlot.type}
                        </p>
                        <div className="cancellation-policy">
                            <h4>Cancellation policy</h4>
                            <p>While you won't be charged if you need to cancel, we ask that you do so at least 24 hours in advance.</p>
                        </div>
                        <div className="about-section">
                            <h4>About</h4>
                            <p>Samite Gastro Bar is the all-day bar of MonAsty Thessaloniki. Situated just steps away from Aristotelous square and boasting a "secret" garden that feels like the perfect place to hide and refresh your palate for delectable choices of breakfast, brunch, light lunch, and excellent coffee in the morning, as well as sophisticated cocktails and fine bites.</p>
                        </div>
                        <p className="terms">All transmission of personally identifiable information is via secure channels. By clicking "Reserve Now" you agree to Resy's Terms of Use and Privacy Policy and Partner's Terms of Use and Privacy Policy.</p>
                        <button className="reserve-button" onClick={handleReserveNow}>Reserve Now</button>
                    </div>
                </div>
            )}

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>Your reservation has been confirmed!</p>
                    <button onClick={() => {
                        setShowConfirmation(false);
                        onClose(); // Close the confirmation popup
                    }}>Close</button>
                </div>
            )}

            {noTablesMessage && (
                <div className="confirmation-popup">
                    <p>{noTablesMessage}</p>
                    <button onClick={() => {
                        setNoTablesMessage(''); // Clear the no table message
                        onClose(); // Close the no table popup
                    }}>Close</button>
                </div>
            )}
        </div>
    );
}

export default TimeSlotsReservation;

