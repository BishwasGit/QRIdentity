import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MenuButton.css';
import { useNavigate  } from 'react-router-dom';


const MenuButton = ({ label, icon, userId }) => {
  const navigate = useNavigate();
const handleButtonClick = (label,userId) => {
  // console.log(`Clicked on option: ${label} ? userid = ${userId}`);
  if (!userId) {
    console.error('User ID not found');
    return;
  }
  if (label === 'Identity Card') {
    navigate(`/personal-identity/${userId}`);
  } else if (label === 'Business Cards') {
    navigate(`/business-cards/${userId}`);
  } else if (label === 'Generate Qr Here') {
    navigate(`/generated-qr/${userId}`);
  }
   else if (label === 'List all') {
    navigate(`/list-generated-qr/${userId}`);
  }
};
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      onClick={() => handleButtonClick(label,userId)
      }
      style={{
        width: '80%',
        padding : '40px',
        gap : '2rem',
      }}
      className = "menu_buttons"
    >
        {icon}
          <Typography variant="h6">{label}</Typography>
    </Button>
  );
};
export default MenuButton;
