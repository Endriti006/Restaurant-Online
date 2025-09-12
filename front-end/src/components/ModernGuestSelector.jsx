import React, { useState, useRef, useEffect } from 'react';
import { FiUsers, FiChevronDown } from 'react-icons/fi';

const ModernGuestSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const guestOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} ${i === 0 ? 'Guest' : 'Guests'}`
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (guestValue) => {
    onChange(guestValue);
    setIsOpen(false);
  };

  const selectedOption = guestOptions.find(option => option.value === parseInt(value));

  return (
    <div className="modern-guest-selector" ref={dropdownRef}>
      <div 
        className={`modern-input-wrapper ${isOpen ? 'focused' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <div className="input-label">
          <FiUsers className="input-icon" />
          <span>Guests</span>
        </div>
        <div className="input-value">
          {selectedOption?.label || '2 Guests'}
        </div>
        <FiChevronDown className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="modern-dropdown">
          {guestOptions.map((option) => (
            <div
              key={option.value}
              className={`dropdown-option ${option.value === parseInt(value) ? 'selected' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(option.value);
              }}
            >
              <FiUsers className="option-icon" />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernGuestSelector;
