import React, { useState } from 'react';
import TimeSlots from './TimeSlots'; // Import TimeSlots component
import ModernGuestSelector from './ModernGuestSelector';
import { ModernDatePicker, ModernTimePicker } from './ModernDateTimePicker';
import '../styles/ModernReservationForm.css';

const ReservationForm = ({ onTriggerLogin }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState(null); // Store selected time

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time); // Update selected time
  };

  const handleGuestChange = (guestCount) => {
    setGuests(guestCount);
  };

  const generateNext10Days = () => {
    const daysArray = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      daysArray.push(nextDate);
    }
    return daysArray;
  };

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="modern-reservation-form">
      <div className="modern-form-container">
        <div className="form-inputs-wrapper">
          <ModernGuestSelector 
            value={guests} 
            onChange={handleGuestChange} 
          />
          
          <ModernDatePicker 
            selectedDate={selectedDate} 
            onChange={handleDateChange} 
          />
          
          <ModernTimePicker 
            selectedTime={selectedTime} 
            onChange={handleTimeChange} 
          />
        </div>
      </div>

      <div className="modern-date-selector">
        {generateNext10Days().map((date, index) => (
          <div key={index} className="modern-date-item">
            <p className="modern-day-label">{daysOfWeek[date.getDay()]}</p>
            <button
              onClick={() => setSelectedDate(date)}
              className={`modern-date-button ${
                selectedDate && selectedDate.toDateString() === date.toDateString() ? 'active' : ''
              }`}
            >
              {date.getDate()}
            </button>
          </div>
        ))}
      </div>

      <TimeSlots
        selectedDate={selectedDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}
        selectedTime={selectedTime} // Pass the selected time
        guests={guests}
        onTriggerLogin={onTriggerLogin}
      />
    </div>
  );
};

export default ReservationForm;
