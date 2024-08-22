import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import Sidebar from './Sidebar'; 
import Home from './Home'; // Import Home component
import axios from 'axios';
import './components.css'; 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', status: 'pending' });
  const [selectedStatus, setSelectedStatus] = useState(''); // State to filter tasks

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [selectedStatus]); // Refetch tasks whenever selectedStatus changes

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://kanbanapp-aj2e.onrender.com/task/get-tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          status: selectedStatus // Include the status filter in the request
        }
      });
      setTasks(response.data.task);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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
      setNewTask({ title: '', status: 'pending' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      await axios.patch(`https://kanbanapp-aj2e.onrender.com/task/update-task/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://kanbanapp-aj2e.onrender.com/task/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

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
          <Home 
            tasks={tasks} 
            updateTask={handleUpdateTask} 
            deleteTask={handleDeleteTask} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
