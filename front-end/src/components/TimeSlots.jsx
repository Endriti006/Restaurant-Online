import React, { useState } from 'react';
import ReservationDialog from './TimeSlotsReservation';

function TimeSlots({ selectedDate, onTriggerLogin, guests,selectedTime }) {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSlotClick = (time, type) => {
        setSelectedSlot({ time, type });
        setShowDialog(true);
    };

    const generateTimeSlots = () => {
        const slots = [];
        const now = new Date();
        const currentDate = new Date(selectedDate);
      
        let startHour = 12; // Default start hour to 12 PM
      
        // Adjust start time based on selected time
        if (selectedTime) {
          const [time, period] = selectedTime.split(' ');
          let hour = parseInt(time.split(':')[0]);
          if (period === 'PM' && hour !== 12) hour += 12; // Convert PM time to 24-hour format
          startHour = hour;
        } else if (now.toDateString() === currentDate.toDateString()) {
          const currentHour = now.getHours();
          const currentMinutes = now.getMinutes();
          startHour = currentMinutes >= 0 ? currentHour + 1 : currentHour;
          if (startHour < 12) startHour = 12; 
          if (startHour > 23) return slots; 
        }
      
        for (let hour = startHour; hour <= 23; hour++) {
          const time = hour <= 12 ? hour : hour - 12;
          const period = hour < 12 ? 'AM' : 'PM';
      
          slots.push(
            <div key={`${hour}:00`} className="slot" onClick={() => handleSlotClick(`${time}:00 ${period}`, 'Drink')}>
              {`${time}:00 ${period}`}<br />Drink
            </div>,
            <div key={`${hour}:00-food`} className="slot" onClick={() => handleSlotClick(`${time}:00 ${period}`, 'Food')}>
              {`${time}:00 ${period}`}<br />Food
            </div>
          );
        }
      
        return slots;
      };

    return (
        <div className="dinner-schedule">
            <h2>Dinner</h2>
            <div className="time-slots-container">
                {generateTimeSlots()}
            </div>
            <h4>About Samite Gastro Bar (Monasty Hotel)</h4>
            <p className="about-bar">
                Samite Gastro Bar is the all-day bar of MonAsty Thessaloniki. Situated just steps away from Aristotelous square and boasting a "secret" garden that feels like the perfect place to hide and refresh your palate for delectable choices of breakfast, brunch, light lunch, and excellent coffee in the morning, as well as sophisticated cocktails and fine bites.
                Samite Gastro Bar is the all-day bar of MonAsty Thessaloniki...
            </p>
            {showDialog && (
                <ReservationDialog
                onClose={() => setShowDialog(false)}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                onTriggerLogin={onTriggerLogin}
                guests={guests}
              />
              
            )}
        </div>
    );
}

export default TimeSlots;