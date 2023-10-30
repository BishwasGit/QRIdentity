// src/components/HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import { Button, Container, Typography } from '@mui/material';
import { Grid, Paper  } from '@mui/material';
import LoginForm from './forms/LoginForm'; // Import your login form component
import { CheckCircle, QrCode, Lock, Update } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import RegisterForm from './forms/RegisterForm';
import Divider from '@mui/material/Divider';
import SocialMediaIcons from './SocialMediaIcons'


const FeatureCard = ({ title, description, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={6}>
      <Paper variant="outlined" style={{ marginBottom: '16px', padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </Grid>
  );
};
const features = [
  {
    title: 'User-Friendly Interface',
    description: 'Navigate effortlessly through QRIdentity\'s intuitive interface for seamless profile management.',
    icon: CheckCircle,
  },
  {
    title: 'QR Code Generation',
    description: 'Generate a personalized QR code containing essential identity details with just a few clicks.',
    icon: QrCode,
  },
  {
    title: 'Secure Encryption',
    description: 'Benefit from robust encryption protocols to safeguard your sensitive information from unauthorized access.',
    icon: Lock,
  },
  {
    title: 'Real-Time Updates',
    description: 'Easily update your personal details, ensuring your information is always accurate and up-to-date.',
    icon: Update,
  },
];
const HomePage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeForm, setActiveForm] = useState('login');

    const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'registration' : 'login');
  };

  const handleNext = () => {
    setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <Container className="bodyContent">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography 
          align="right" 
          paragraph 
          style={{ marginTop: '12rem', marginBottom: '16px', marginLeft: '8px', marginRight: '8px' }}
          >
            Your secure identity management solution.QRIdentity is a cutting-edge web application designed to provide a secure and efficient way to manage sensitive identity information. With QRIdentity, users can create and store their personal details in a highly encrypted environment. The application generates a QR code containing critical information like citizenship number, driver's license, and more. Upon scanning the QR code, QRIdentity displays an identity card, ensuring quick and secure access to vital information.<Divider light  variant="middle" style={{ marginTop: '30px', marginBottom: '20px' }}/>
            <SocialMediaIcons /> 
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
         <div className="form">
         <Typography
          align="center"
          gutterBottom
          className="heading"
          variant="h3"
          style={{
            fontFamily: 'Aileron',
            fontWeight: 'bold', // Set the font weight
            color: '#333', // Set the text color
            textTransform: 'uppercase', // Convert text to uppercase
            letterSpacing: '2px', // Add letter spacing
          }}
        >
          QRIdentity  <Divider light  variant="middle" style={{ marginTop: '10px' }} /> 
          <span
              style={{
                fontFamily: 'Aileron',
                fontWeight: '900',
                fontSize: '12px',      
              }}
          >Your secure identity management solution</span>
        </Typography>
        <div>
            {activeForm === 'login' && <LoginForm />}
            {activeForm === 'registration' && <RegisterForm />}
          </div>
        <Button variant="text" onClick={toggleForm}  style={{ float : 'right'}}>
        {activeForm === 'login' ? 'Register Now' : 'Back to Login'}
        </Button>
        </div>
        </Grid>
      </Grid>
      <div className='my-1'>
      <Carousel
      autoPlay={true}
      animation="slide"
      timeout={500}
      index={activeFeature}
      onChange={(index) => setActiveFeature(index)}
      style={{
        maxWidth: '600px', // Set a maximum width for the carousel
        margin: '0 auto', // Center the carousel on the page
      }}
    >
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} description={feature.description}    
              style={{
                width: '100%', // Set the width of each carousel item
                padding: '16px', // Add padding for better spacing
              }} />
            ))}
          </Carousel>
          <div>
            <Button onClick={handlePrev}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
          </div>

    </Container>
  );
};

export default HomePage;