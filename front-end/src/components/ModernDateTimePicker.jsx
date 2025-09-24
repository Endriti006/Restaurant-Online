import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FiCalendar, FiClock, FiChevronDown } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

const ModernDatePicker = ({ selectedDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDisplayDate = (date) => {
    const d = date || new Date();
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g. "Sep 19"
  };

  return (
    <div className="modern-date-picker">
      <div 
        className={`modern-input-wrapper ${isOpen ? 'focused' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="input-label">
          <FiCalendar className="input-icon" />
          <span>Date</span>
        </div>
        <div className="input-value">
          {formatDisplayDate(selectedDate)}
        </div>
        <FiChevronDown className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </div>

      {/* Anchor the popper to an invisible input positioned over the segment */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          onChange(date);
          setIsOpen(false);
        }}
        minDate={new Date()}
        onClickOutside={() => setIsOpen(false)}
        open={isOpen}
        shouldCloseOnSelect
        showPopperArrow={false}
        dateFormat="MMM d"
        popperPlacement="bottom-start"
        calendarClassName="modern-calendar"
        popperClassName="modern-datepicker-popper"
      />
    </div>
  );
};

const ModernTimePicker = ({ selectedTime, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const timeOptions = [
    '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM',
    '3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM',
    '6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM',
    '9:00 PM','9:30 PM','10:00 PM'
  ];

  useEffect(() => {
    const onDoc = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className="modern-time-picker" ref={dropdownRef}>
      <div 
        className={`modern-input-wrapper ${isOpen ? 'focused' : ''}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
      >
        <div className="input-label">
          <FiClock className="input-icon" />
          <span>Time</span>
        </div>
        <div className="input-value">{selectedTime || '7:00 PM'}</div>
        <FiChevronDown className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </div>

      {isOpen && (
        <div className="modern-dropdown time-dropdown">
          {timeOptions.map((t) => (
            <div
              key={t}
              className={`dropdown-option ${t === selectedTime ? 'selected' : ''}`}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange(t); setIsOpen(false); }}
            >
              {t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ModernDatePicker, ModernTimePicker };
