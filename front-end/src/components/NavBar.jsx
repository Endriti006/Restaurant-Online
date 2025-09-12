import React, { useState, useEffect } from 'react';
import Admin from './AdminComponents/Admin'; // Import the Admin component

function NavBar({ onLoginClick }) {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [sidebarShow, setSidebar] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false); // State to control Admin component visibility

    const openSidebar = () => {
        setSidebar(!sidebarShow);
    };

    const handleAdminClick = () => {
        setShowAdmin(true); // Show the Admin component
    };

    const handleCloseAdmin = () => {
        setShowAdmin(false); // Hide the Admin component
    };

    useEffect(() => {
        const checkUser = async () => {
            const userId = localStorage.getItem('userSession');
            if (userId && userId.length >= 8) {
                try {
                    const response = await fetch(`http://localhost:5050/users/id/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUserName(data.user.fullName);
                        setUserRole(data.user.role);
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                        setUserName('');
                        setUserRole('');
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            } else {
                setIsLoggedIn(false);
                setUserName('');
                setUserRole('');
            }
        };

        checkUser();
    }, []);

    const handleDropdownToggle = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleSignOut = () => {
        localStorage.removeItem('userSession');
        window.location.reload();
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav>
                <div className='wrapper-md navbar-container'>
                    <div className="left-side">
                        {windowWidth < 800 ? (
                            <div onClick={openSidebar} className='sidebar'>
                                <span className="material-symbols-outlined">menu</span>
                                {sidebarShow && (
                                    <ul>
                                        <li><a href="about">About</a></li>
                                        <li><a href="careers">Careers</a></li>
                                        <li><a href="newsroom">Newsroom</a></li>
                                        <li><a href="IOS App">IOS App</a></li>
                                    </ul>
                                )}
                            </div>
                        ) : null}

                        {windowWidth >= 800 ? (
                            <ul className="navbar-menu">
                                <li><a href="about">About</a></li>
                                <li><a href="careers">Careers</a></li>
                                <li><a href="newsroom">Newsroom</a></li>
                                <li><a href="IOS App">IOS App</a></li>
                            </ul>
                        ) : null}
                    </div>
                    <div className="right-side">
                        {isLoggedIn ? (
                            <div className="right-side" onClick={handleDropdownToggle}>
                                <h1>{userName}</h1>
                                <svg className='drop-down' version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 66.91" >
                                    <g>
                                        <path d="M11.68,1.95C8.95-0.7,4.6-0.64,1.95,2.08c-2.65,2.72-2.59,7.08,0.13,9.73l54.79,53.13l4.8-4.93l-4.8,4.95 c2.74,2.65,7.1,2.58,9.75-0.15c0.08-0.08,0.15-0.16,0.22-0.24l53.95-52.76c2.73-2.65,2.79-7.01,0.14-9.73 c-2.65-2.72-7.01-2.79-9.73-0.13L61.65,50.41L11.68,1.95L11.68,1.95z" />
                                    </g>
                                </svg>

                                <div className={`user-info ${isDropdownVisible ? 'visible' : ''}`}>
                                    <ul>
                                        <li>Reservations & Notify</li>
                                        <br />
                                        {userRole === 'Admin' && <li onClick={handleAdminClick}>Admin Page</li>}
                                        <hr />
                                        <li onClick={handleSignOut}>Sign Out</li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="button-login"
                                type="button"
                                id="button"
                                onClick={onLoginClick}
                            >
                                Log In
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <hr className="navbar-hr" />

            {showAdmin && <Admin onClose={handleCloseAdmin} />} {/* Render Admin component */}
        </>
    );
}

export default NavBar;
