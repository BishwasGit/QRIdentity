import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import NavBar from "../NavBar";
import { useParams } from "react-router-dom";

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

const PersonalIdentity = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          // console.log(data.user); // User details
          setUserData(data.user);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [userId]);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar userData={userData} />
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
              <Tab label="Personal Information" {...a11yProps(0)} />
              <Tab label="Address Details" {...a11yProps(1)} />
              <Tab label="Contact Details" {...a11yProps(2)} />
              <Tab label="Parents Details" {...a11yProps(3)} />
              <Tab label="Sensitive Details" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <form>
            <CustomTabPanel
              value={value}
              index={0}
              style={{
                width: "100%",
              }}
            >
              <Card variant="outlined" style={{ padding: "10px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        id="first_name"
                        label="First Name"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="middle_name"
                        label="Middle Name"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="last_name"
                        label="Last Name"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                          labelId="gender-label"
                          id="gender"
                          label="Gender"
                          required
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CustomTabPanel>

            <CustomTabPanel
              value={value}
              index={1}
              style={{
                width: "100%",
              }}
            >
              <Card variant="outlined" style={{ padding: "10px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Address Details Text fileds here in a card*/}
                    <Grid item xs={6}>
                      <TextField
                        id="perm_address"
                        label="Permament Address"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="temp_address"
                        label="Current Address"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="citizenship_address"
                        label="Address according to citizenship"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="country"
                        label="Country"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CustomTabPanel>

            <CustomTabPanel
              value={value}
              index={2}
              style={{
                width: "100%",
              }}
            >
              {/* Contact Details Text fileds here in a card*/}
              <Card variant="outlined" style={{ padding: "10px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="phone_number"
                        label="Phone Number"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="email_address"
                        label="Email Address"
                        variant="outlined"
                        required
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="web_site"
                        label="Web Site"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={3}
              style={{
                width: "100%",
              }}
            >
              {/* Parents Details Text fileds here in a card*/}
              <Card variant="outlined" style={{ padding: "10px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="grandfather_name"
                        label="Grand Father's Name"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="father_name"
                        label="Father's Name"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={4}
              style={{
                width: "100%",
              }}
            >
              {/* Sensitive Details Text fileds here in a card*/}
              <Card variant="outlined" style={{ padding: "10px" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="citizenship_number"
                        label="Citizenship Number"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="license_number"
                        label="Driving License Number"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="passport_number"
                        label="Passport Number"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="nid_number"
                        label="National Identity Card Number"
                        variant="outlined"
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CustomTabPanel>
            <Button variant="contained" color="success">
              Generate Qr
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
};
export default PersonalIdentity;
