import React, { useState, useEffect } from 'react';
import '../../styles/LogReg.css';
import Login from "./Login";
import Register from "./Register";

export default function LogReg({ onClose }) {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
    const [popupVisible, setPopupVisible] = useState(true);

    // Move the userId check and return statement after the hooks
    useEffect(() => {
        if (popupVisible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [popupVisible]);

    // Check if userId is valid
    const userId = localStorage.getItem('userId');
    if (userId) {
        return <div></div>; // Return an empty div if userId is invalid
    }

    const toggleComponent = () => {
        setIsLogin(!isLogin); // Toggle between Login and Register
    };

    return (
        <div className='LogReg-popup'>
            <div className="background-dark" onClick={onClose}></div> {/* Clicking outside will close the popup */}
            <div className='log-reg-popup'>
                <div className='nav'>
                    <svg onClick={toggleComponent} className='left' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 312 511.42">
                        <path fillRule="nonzero" d="M306.3 32.62 65.46 252.86 312 478.8l-29.84 32.62L0 252.83 276.46 0z"/>
                    </svg>
                
                
                    <svg onClick={onClose} className="exit" version="1.1" id="Layer_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88">
                        <g>
                            <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" fill="black"/>
                        </g>
                    </svg>
                </div>


                    {isLogin ? (
                        <Login onToggle={toggleComponent} />
                    ) : (
                        <Register onToggle={toggleComponent} />
                    )}

                
            </div>
        </div>
    );
}
