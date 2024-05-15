import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';
import { useNavigate } from 'react-router-dom';


const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/tasks', { title, description, dueDate, priority, status: 'pending' });
   
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
    navigate('/tasklist');
    fetchTasks();
   
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className='heading'>Task Management System</h1>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      {/* <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div> */}
      <div>
  <label>Priority</label>
  <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</div>

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
