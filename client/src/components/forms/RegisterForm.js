import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../HomePage.css';


const RegisterForm = ({ activeForm }) => {
  AOS.init();

  // State variables to store form data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const Swal = require('sweetalert2')
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const checkExistingEmail = async (email) => {
      try {
        const response = await fetch('http://localhost:5000/api/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
    
        const data = await response.json();
        return data.exists;
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    };
    
      const existingEmail = await checkExistingEmail(email);
      if (existingEmail) {
        Swal.fire(
          'Error',
          'Email already exists !',
          'error'
        )
        return;
      }

    // Send registration data to server
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire(
            'Success',
            'User registered successfully !',
            'success'
          )
        // Additional logic if needed (e.g., redirect to another page)
      } else {
        Swal.fire(
            'Error',
            + data.message,
            'error'
          )
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div data-aos="fade-left">
      <form onSubmit={handleRegister} className="flex-column">
      <p className="form_headings">Register Here</p>
        <TextField
          id="username"
          label="User Name"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id="email"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          id="confirmPassword"
          label="Re-Password"
          variant="standard"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Register</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
