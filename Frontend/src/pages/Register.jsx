import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './components.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const payload = { name, email, password, role };

        try {
            const response = await fetch("https://kanbanapp-aj2e.onrender.com/user/register", {
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

            if (response.ok && res.message === "User registered successfully") {
                alert("User registered successfully");
                navigate("/login");
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
                    <h1>Register</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form>
                        <div>
                           
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="button" onClick={handleSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
