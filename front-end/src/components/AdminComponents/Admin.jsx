import React, { useState } from 'react';
import Users from './Users';
import Reservations from './Reservations';
import Syslog from './Syslog';

export default function Admin({ onClose }) {
    const [activeView, setActiveView] = useState('users'); // State to manage the active view

    const handleNavClick = (view) => {
        setActiveView(view);
    };

    return (
        <div className="admin">
            <div className="background"></div>

            <div className="content">
                <ul className="navigation">
                    <li
                        className={activeView === 'users' ? 'active' : ''}
                        onClick={() => handleNavClick('users')}
                    >
                        Users
                    </li>
                    <hr />
                    <li
                        className={activeView === 'reservations' ? 'active' : ''}
                        onClick={() => handleNavClick('reservations')}
                    >
                        Reservations
                    </li>
                    <hr />
                    <li
                        className={activeView === 'syslog' ? 'active' : ''}
                        onClick={() => handleNavClick('syslog')}
                    >
                        Syslog
                    </li>
                    <hr />
                    <li onClick={onClose} className='exit'>Exit</li>
                </ul>

                <div className="tableContent">
                    {activeView === 'users' && <Users />}
                    {activeView === 'reservations' && <Reservations />}
                    {activeView === 'syslog' && <Syslog />}
                </div>
            </div>
        </div>
    );
}
