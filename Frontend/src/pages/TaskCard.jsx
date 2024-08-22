import React, { useState } from 'react';
import './components.css';

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdateTask(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="task-actions">
            <button className="edit-button" onClick={handleSave}>
              Save
            </button>
            <button className="delete-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>Status: {task.status}</p>
          <div className="task-actions">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDeleteTask(task._id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
