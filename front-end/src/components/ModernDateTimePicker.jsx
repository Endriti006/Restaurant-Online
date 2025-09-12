import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FiCalendar, FiClock, FiChevronDown } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

const ModernDatePicker = ({ selectedDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDisplayDate = (date) => {
    if (!date) return 'Today';
    
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) return 'Today';
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="modern-date-picker">
      <div 
        className={`modern-input-wrapper ${isOpen ? 'focused' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="input-label">
          <FiCalendar className="input-icon" />
          <span>Date</span>
        </div>
        <div className="input-value">
          {formatDisplayDate(selectedDate)}
        </div>
      </div>
      
      {isOpen && (
        <div className="datepicker-overlay" onClick={() => setIsOpen(false)}>
          <div className="datepicker-container" onClick={(e) => e.stopPropagation()}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                onChange(date);
                setIsOpen(false);
              }}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)} // 60 days from now
              inline
              calendarClassName="modern-calendar"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ModernTimePicker = ({ selectedTime, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const timeOptions = [
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
    "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (time) => {
    onChange(time);
    setIsOpen(false);
  };

  return (
    <div className="modern-time-picker" ref={dropdownRef}>
      <div 
        className={`modern-input-wrapper ${isOpen ? 'focused' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <div className="input-label">
          <FiClock className="input-icon" />
          <span>Time</span>
        </div>
        <div className="input-value">
          {selectedTime || 'Select time'}
        </div>
        <FiChevronDown className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="modern-dropdown time-dropdown">
          {timeOptions.map((time) => (
            <div
              key={time}
              className={`dropdown-option ${time === selectedTime ? 'selected' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(time);
              }}
            >
              <FiClock className="option-icon" />
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ModernDatePicker, ModernTimePicker };
