import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate  } from 'react-router-dom';
import  NavBar  from './NavBar';
import Menu from './Menus/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Dashboard = () => {

  const lightTheme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [userData, setUserData] = useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const handleThemeChange = (isChecked) => {
  setIsDarkMode(isChecked);
};


  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('userId');
    // console.log(userId);
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        //if the id is stored as an object in the collection
        // const response = await fetch(`http://localhost:5000/api/user/${userId.toHexString()}`);
        const data = await response.json();
  
        if (response.ok) {
          setUserData(data.user);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (userId) {
      fetchUserDetails();
    }
    if (isLoggedIn !== 'true') {
      // User is not logged in, redirect to login page
      Swal.fire('Access Denied', 'Please log in to access the dashboard.', 'error');
      navigate('/'); // Redirect to the login page
    }
  }, [navigate]);
  return (
    <div>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NavBar
        userData={userData}
        onLogout={() => setUserData(null)}
        isDarkMode={isDarkMode}
        onThemeChange={handleThemeChange}
      />  
    </ThemeProvider>
    <Menu userId={userData ? userData._id : null} />
    </div>
  )
}

export default Dashboard
