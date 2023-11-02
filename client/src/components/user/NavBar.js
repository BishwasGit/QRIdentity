import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AppDrawer from "./Drawer";
// import Switch from "@mui/material/Switch";

export default function NavBar({ userData, onLogout, onThemeChange }) {
  /* const [switchChecked, setSwitchChecked] = React.useState(false); */
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    if (onLogout) {
      onLogout();
    }
    navigate("/"); // Redirect to HomePage
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <React.Fragment>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <AppDrawer
              isOpen={isDrawerOpen}
              toggleDrawer={handleToggleDrawer}
            />
          </React.Fragment>
          {userData &&
            userData.username && ( // Check if userData and username are available
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome, {userData.username}!
              </Typography>
            )}
          {/* <Switch
            checked={switchChecked}
            onChange={(event) => onThemeChange(event.target.checked)}
            color="default"
          /> */}
          <Button color="inherit" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
