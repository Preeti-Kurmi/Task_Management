import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './TaskList.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate=useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    const response = await axios.get(`http://localhost:3001/api/tasks?page=${page}&limit=10`);
    setTasks(response.data.tasks);
    setTotalPages(response.data.totalPages);
  };
 const detailTask=async(id,e)=>{
    e.preventDefault();
    navigate(`/taskdetail/${id}`)

  }
  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      fetchTasks();
    }
  };

  const changeStatus = async (id, status) => {
    await axios.patch(`http://localhost:3001/api/tasks/${id}/status`, { status });
    fetchTasks();
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className={task.priority}>
            <Link to={`/tasks/${task._id}`}>
              <h3>{task.title}</h3>
            </Link>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <p>Priority of task:{task.priority}</p>

            <button onClick={() => changeStatus(task._id, task.status === 'pending' ? 'completed' : 'pending')}>
              {task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <button onClick={(e) => detailTask(task._id,e)}>Detail</button>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
       
      </div>
    </div>
  );
};

export default TaskList;
