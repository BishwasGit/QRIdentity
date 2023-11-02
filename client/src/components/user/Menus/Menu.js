import React from 'react';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MenuButton from './MenuButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Menu = ({ userId }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}  style={{
        marginTop : '5rem',
        textAlign : 'center',
        padding: '20px'
      }}>
      <MenuButton label="Identity Card" icon={<PersonIcon />} userId ={userId}/>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4} style={{
        marginTop : '5rem',
        textAlign : 'center',
        padding: '20px'
      }}>
      <MenuButton label="Business Cards" icon={<BusinessIcon />} userId ={userId}/>
      </Grid> */}
      <Grid item xs={12} sm={6} md={4}  style={{
        marginTop : '5rem',
        textAlign : 'center',
        padding: '20px'
      }}>
      <MenuButton label="Generate Qr Here" icon={<QrCodeIcon />} userId ={userId}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}  style={{
        marginTop : '5rem',
        textAlign : 'center',
        padding: '20px'
      }}>
      <MenuButton label="List all" icon={<FormatListBulletedIcon />} userId ={userId}/>
      </Grid>
    </Grid>
  );
}

export default Menu;
