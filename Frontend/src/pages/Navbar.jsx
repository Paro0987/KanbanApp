import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to clear auth token and navigate to login page
    navigate('/login');
  };

  return (
    <div className="navbar">
      <h2>Kanban Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
