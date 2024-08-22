import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import './components.css';

const Home = ({ tasks, updateTask, deleteTask }) => {
    const [filteredTasks, setFilteredTasks] = useState(tasks);

    const filterByStatus = (status) => {
        if (status === '') {
            setFilteredTasks(tasks); // Show all tasks
        } else {
            setFilteredTasks(tasks.filter(task => task.status === status));
        }
    };

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    return (
        <div className="main-page">
            <h2>Tasks</h2>
            <div className="task-list">
                {filteredTasks.map(task => (
                    <TaskCard key={task._id} task={task} onEdit={updateTask} onDelete={deleteTask} />
                ))}
            </div>
        </div>
    );
};

export default Home;
