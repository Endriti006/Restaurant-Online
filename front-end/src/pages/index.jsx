import React, { useState, useEffect } from 'react';
import HeroSeaction from "../components/HeroSection";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ReservationForm from "../components/ReservationForm";
import RestaurantDetails from "../components/RestaurantDetails";
import LogReg from "../components/Login&Register/LogReg";
import TimeSlots from '../components/TimeSlots';
import PhoneApp from '../components/PhoneApp';
import Admin from '../components/AdminComponents/Admin';

export default function Home() {
    const [isLogRegVisible, setIsLogRegVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleLoginClick = () => {
        setIsLogRegVisible(true);
    };

    const handleCloseLogReg = () => {
        setIsLogRegVisible(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div>
                <NavBar onLoginClick={handleLoginClick}/>

                <div className='main-hero wrapper-md'>
                    <div>
                        <HeroSeaction />
                        <ReservationForm onTriggerLogin={handleLoginClick}/>


                        {windowWidth < 1000 ? (
                            <RestaurantDetails />
                        ) : null}
                    </div>

                        <div>
                            <img src="./img/Restaurant.jfif" alt="" />
                            {windowWidth >= 1000 ? (
                            <RestaurantDetails />
                        ) : null}
                        </div>
                </div>

                <PhoneApp/>

                <Footer/>
            </div>

            {isLogRegVisible && <LogReg onClose={handleCloseLogReg} />}


        </>
    );
}
