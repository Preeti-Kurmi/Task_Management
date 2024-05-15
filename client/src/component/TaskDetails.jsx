import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './TaskDetails.css';


const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const response = await axios.get(`http://localhost:3001/api/tasks/${id}`);
    setTask(response.data);
  };


  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/api/tasks/${id}`, task);
   navigate('/tasklist')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleEdit}>
        <div>
          <label>Title</label>
          <input name="title" value={task.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={task.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        </div>
        <button type="submit" >Save Changes</button>
      </form>
    </div>
  );
};

export default TaskDetails;
