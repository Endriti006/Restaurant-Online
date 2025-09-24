import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import LogReg from '../components/Login&Register/LogReg';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import "../styles/index.css";

export default function AboutUs() { // Component name starts with uppercase

    const [isLogRegVisible, setIsLogRegVisible] = useState(false);

    const handleLoginClick = () => {
        setIsLogRegVisible(true);
    };

    const handleCloseLogReg = () => {
        setIsLogRegVisible(false);
    };

    return (
        <>
            <NavBar onLoginClick={handleLoginClick} />
            {isLogRegVisible && <LogReg onClose={handleCloseLogReg} />}

            <About/>

            <Contact/>

            <Footer/>
        </>
    );
}
