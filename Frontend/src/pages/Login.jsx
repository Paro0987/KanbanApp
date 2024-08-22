import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const payload = { email, password };

        try {
            const response = await fetch("https://kanbanapp-aj2e.onrender.com/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const text = await response.text();
            let res;
            try {
                res = JSON.parse(text);
            } catch (err) {
                throw new Error('Response is not valid JSON');
            }

            if (response.ok && res.message === "User LoggedIn successfully") {
                localStorage.setItem('token', res.token);
                navigate("/dashboard");
            } else {
                setError(res.message || "An error occurred");
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="image-container"></div>
            <div className="form-container">
                <div className="form-wrapper">
                    <h1>Welcome to Login Page</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
