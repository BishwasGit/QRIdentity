import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Back to Dashboard
        </Button>
      </Link>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Personal Details" {...a11yProps(0)} />
            <Tab label="Address Details" {...a11yProps(1)} />
            <Tab label="Parents Details" {...a11yProps(2)} />
            <Tab label="Sensitive Details" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <form spacing={2}>
          <CustomTabPanel value={value} index={0}>
            {/* Personal Details Text fileds here in a card*/}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {/* Address Details Text fileds here in a card*/}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {/* Parents Details Text fileds here in a card*/}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {/* Sensitive Details Text fileds here in a card*/}
          </CustomTabPanel>
          <Button variant="contained" color="success">
            Generate Qr
          </Button>
        </form>
      </Box>
    </div>
  );
}
