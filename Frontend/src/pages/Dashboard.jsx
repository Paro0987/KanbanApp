import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import Sidebar from './Sidebar';
import axios from 'axios';
import './components.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
  const [selectedStatus, setSelectedStatus] = useState(''); // State to filter tasks

  // Fetch tasks when the component mounts or selectedStatus changes
  useEffect(() => {
    fetchTasks();
  }, [selectedStatus]);

  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://kanbanapp-aj2e.onrender.com/task/get-tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          status: selectedStatus // Pass the status filter
        }
      });
      setTasks(response.data.task);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to create a new task
  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        'https://kanbanapp-aj2e.onrender.com/task/create-task',
        newTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '', status: 'pending' }); // Reset new task fields
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Function to update an existing task
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      await axios.patch(`https://kanbanapp-aj2e.onrender.com/task/update-task/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks(); // Refetch tasks after update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://kanbanapp-aj2e.onrender.com/task/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== taskId)); // Update task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to filter tasks by status
  const filterByStatus = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar filterByStatus={filterByStatus} />
        <div className="main-content">
          <div className="create-task">
            <h3>Create Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="create-task-button" onClick={handleCreateTask}>
              Add Task
            </button>
          </div>
          <div className="task-list">
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onUpdateTask={handleUpdateTask} 
                onDeleteTask={handleDeleteTask} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
