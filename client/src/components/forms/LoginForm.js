import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../HomePage.css';
import { useNavigate  } from 'react-router-dom';

const LoginForm = () => {
  AOS.init();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', data.user._id);
        navigate('/dashboard'); // Use history to navigate
        //  window.location.href = '../user/dashboard';
      } else {
        Swal.fire('Error', data.message, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div data-aos="fade-right">
      <form onSubmit={handleLogin} className="flex-column">
      <p className="form_headings">Login Here</p>
        <TextField
          id="standard-basic"
          label="Email Address"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
