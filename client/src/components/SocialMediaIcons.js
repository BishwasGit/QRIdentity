import React from 'react';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';

const SocialMediaIcons = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton color="primary">
        <FacebookIcon />
      </IconButton>
      <IconButton color="primary">
        <TwitterIcon />
      </IconButton>
      <IconButton color="primary">
        <InstagramIcon />
      </IconButton>
      <IconButton color="primary">
        <LinkedInIcon />
      </IconButton>
      <IconButton color="primary">
        <YouTubeIcon />
      </IconButton>
      <IconButton color="primary">
        <PinterestIcon />
      </IconButton>
    </div>
  );
}

export default SocialMediaIcons;
