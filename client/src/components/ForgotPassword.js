import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Processing...');

        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Please check your email for the password reset instructions.');
            } else {
                setMessage(data.message || 'Unable to send password reset email.');
            }
        } catch (error) {
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <div>
            <div className="forgot-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
