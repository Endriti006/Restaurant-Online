import React, { useState } from 'react';

export default function Login({ onToggle }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5050/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('You are logged in', data);

                localStorage.setItem('userSession', data.user._id);

                // Reload the page after successful login
                window.location.reload();
            } else {
                setError('Your email or password is incorrect');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const disabled = !email || !password || loading;

    return (
        <div className="login login--enhanced">
            <div className="login-card">
                <aside className="login-media" aria-hidden="true">
                    <img src="/img/restaurantimg.jpeg" alt="Dining ambience" />
                    <div className="login-media-overlay">
                        <span className="brand-badge">HELLORES</span>
                        <p>Reserve the moments that matter.</p>
                    </div>
                </aside>

                <section className="login-content" aria-label="Login form">
                    <div className="login-header">
                        <h2>Welcome back</h2>
                        <p className="subtitle">Sign in to manage your reservations and account.</p>
                    </div>

                    {error && <div className="alert error" role="alert">{error}</div>}

                    <form onSubmit={handleLogin} noValidate>
                        <div className="form-field">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <div className="password-input">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-visibility"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button className={`submit ${disabled ? 'disabled' : ''}`} type="submit" disabled={disabled}>
                            {loading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>

                    <p className="switch-auth">
                        Don't have an account? <button type="button" onClick={onToggle} className="link-btn">Sign up</button>
                    </p>
                </section>
            </div>
        </div>
    );
}
