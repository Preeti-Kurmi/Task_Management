import React from 'react';
import './Login.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {email, password };
  try{
    let result=await axios.post('http://localhost:3001/login', user);
    if (result) {
      alert("Login Successful");
      navigate('/taskform');
    }
  }
  catch(err){
    console.log(err);


  }}

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required 
          onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required
           onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
