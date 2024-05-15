import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

export default function Signup() {
  const[name,setName]=useState();
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, password };

  //   await axios.post('http://localhost:3001/register', user)
  //     .then(result => console.log(result)
  //       alert("User Successfully Sign up"))
  //     .catch(err => console.log(err));
  // };
  try {
    const result = await axios.post('http://localhost:3001/register', user);
    console.log(result);
    alert("User Successfully Signed Up");
  } catch (err) {
    console.error(err);
    alert("Error signing up. Please try again.");
  }
};



  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name"
           required 
           autoComplete='off'
          onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required
           autoComplete='off'
           onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"
          autoComplete='off' required 
           onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to='/Login'>Login</Link></p>
    </div>
  );
}
