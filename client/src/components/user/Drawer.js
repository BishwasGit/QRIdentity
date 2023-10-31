import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const AppDrawer = ({ isOpen, toggleDrawer, onLogout }) => {
        const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
    
        if (onLogout) {
          onLogout();
        }
    
        navigate('/'); // Redirect to HomePage
      };
  const list = () => (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'User Profile'} />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Generated QR'} />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Identity Cards'} />
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Business Cards'} />
        </ListItem>
      </List>
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'Log Out'} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer}
    >
      {list()}
    </Drawer>
  );
}

export default AppDrawer;
