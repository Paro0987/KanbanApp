import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import Sidebar from './Sidebar';
import './components.css';

const Home = ({ tasks, updateTask, deleteTask }) => {
    const [filteredTasks, setFilteredTasks] = useState([]);

    const filterByStatus = (status) => {
        console.log('Filtering by status:', status); // Debug log
        if (status === '') {
            setFilteredTasks(tasks); // Show all tasks
        } else {
            setFilteredTasks(tasks.filter(task => task.status === status));
        }
    };

    useEffect(() => {
        console.log('Tasks data:', tasks); // Debug log
        // Initialize filtered tasks with all tasks
        setFilteredTasks(tasks);
    }, [tasks]);

    return (
        <div className="main-page">
            <Sidebar filterByStatus={filterByStatus} />
            <div className="task-list">
                {filteredTasks.map(task => (
                    <TaskCard key={task._id} task={task} onEdit={updateTask} onDelete={deleteTask} />
                ))}
            </div>
        </div>
    );
};

export default Home;
