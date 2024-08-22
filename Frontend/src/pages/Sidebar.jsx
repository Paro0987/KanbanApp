import React from 'react';
import './components.css'; // Ensure this file contains the necessary styles

const Sidebar = ({ filterByStatus }) => {
    // Define the statuses and other options
    const options = [
        { label: 'All Tasks', status: '' }, // Empty status for all tasks
        { label: 'Pending', status: 'Pending' },
        { label: 'In Progress', status: 'In Progress' },
        { label: 'Completed', status: 'Completed' },
    ];

    return (
        <div className="sidebar">
            <h2>Filter Tasks</h2>
            <ul>
                {options.map((option) => (
                    <li key={option.status}>
                        <button
                            onClick={() => filterByStatus(option.status)}
                            className="sidebar-button"
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
