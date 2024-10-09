import React, { useState } from 'react';
import axios from 'axios';
import './Admin1.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function Admin1() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const login = async () => {
    try {
      const data = { 
        email: email,
        pwd: pwd
      };
      const response = await axios.post("http://192.168.43.158:3000/login", data);
      
      console.log(response.data);
      
      if (response.status === 200) {
        alert("Login Success");
        navigate('/Menu2');
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
      
    
   <>
   
    
    <div className="login-form-container">
   
      
      

      <form className="login-form" onSubmit={(e) => { e.preventDefault(); login(); }}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={pwd} onChange={handlePwdChange} required />
        </div>
        <button type="submit" className="login-button">Submit</button>
      </form>

    </div>
    </>
  );
}
