import React, { useState } from 'react';

export default function Register({ onToggle }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState('+1'); // Default to +1
    const [localNumber, setLocalNumber] = useState('');
    const [error, setError] = useState('');

    const namePattern = /^[A-Z][a-zA-Z\s]*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/; 

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!namePattern.test(fullName)) {
            setError('Full name must start with an uppercase letter and contain no numbers.');
            return;
        }

        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!passwordPattern.test(password)) {
            setError('Password must be at least 6 characters long, contain at least one uppercase letter and one number.');
            return;
        }

        const phone = `${countryCode.replace('+', '')}${localNumber}`;

        const payload = {
            fullName,
            email,
            password,
            phone: phone ? phone : null
        };

        try {
            const response = await fetch('http://localhost:5050/users/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful', data);
            } else if (response.status === 409) {
                setError('A user with this email already exists.');
            } else {
                setError('Registration failed. Please check your input and try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='login'>

            <div className='content'>
                <div className='top'>
                    <h3 className='logo'>HELLORES</h3>
                    <p>Resy’s hospitality platform securely manages your account information and reservations.</p>
                    <h3>Please sign up:</h3>
                </div>

                <form onSubmit={handleRegister}>
                    <div>
                        <label>FULL NAME*</label>
                        <input
                            type="text"
                            name="fullName"
                            value={fullName}
                            placeholder='Name & Surname'
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>EMAIL ADDRESS*</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            placeholder='Email Address'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>PASSWORD*</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>PHONE NUMBER*</label>

                        <div className='phoneCode'>
                            <select
                                name="countryCode"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                            >
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+91">+91</option>
                                <option value="+61">+61</option>
                                <option value="+81">+81</option>
                                <option value="+383">+383</option>
                                {/* Add more options as needed */}
                            </select>

                            <input
                                type="number"
                                name="localNumber"
                                value={localNumber}
                                placeholder='Phone Number'
                                onChange={(e) => setLocalNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <input 
                        className={`submit ${!fullName || !email || !password ? 'disabled' : ''}`}
                        type="submit" 
                        name="submit" 
                        value="Register" 
                        disabled={!fullName || !email || !password}
                    />
                </form>

                {error && <p className='error'>{error}</p>}

            </div>
        </div>
    );
}
