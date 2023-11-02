import React, { useState, useEffect } from "react";
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
import { Input } from "@mui/material";
import Swal from 'sweetalert2';


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

  const [formData, setFormData] = React.useState({
    user_id: userId,
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    perm_address: "",
    current_address: "",
    citizenship_address: "",
    city: "",
    country: "",
    phone_number: "",
    email_address: "",
    web_site: "",
    grandfather_name: "",
    father_name: "",
    citizenship_number: "",
    license_number: "",
    passport_number: "",
    nid_number: "",
  });

  const handleRegistration = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/personal-identity-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data for personal identity stored successfully. Now you can generate a QR',
        }).then(() => {
          // Redirect to dashboard
          window.location.href = '/dashboard';
        });
      } else if(data.message === 'Citizenship number already exists'){
        if (data.message === 'Citizenship number already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Citizenship number already exists in the database',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error registering user: ' + data.message,
          });
        }
      }
       else if(data.message === 'License number already exists'){
        if (data.message === 'License number already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'License number already exists in the database',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error registering user: ' + data.message,
          });
        }
      }
       else if(data.message === 'Passport number already exists') {
        if (data.message === 'Passport number already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Passport number already exists in the database',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error registering user: ' + data.message,
          });
        }
      }
       else{
        if (data.message === 'NID number already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'NID number already exists in the database',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error registering user: ' + data.message,
          });
        }
    }
    } catch (error) {
      console.error('Error:', error);
    }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegistration(formData);
          }}
        >
          <Input
            id="user_id"
            value={formData.user_id} // Assuming `userId` is a valid value
            type="hidden"
          />
          <Card
            variant="outlined"
            style={{ padding: "10px", marginTop: "2rem", marginBottom: "2rem" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p
                    style={{
                      fontFamily: "Aileron",
                      fontWeight: "900",
                      letterSpacing: "2",
                    }}
                  >
                    Perosnal Details
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="first_name"
                    label="First Name"
                    variant="outlined"
                    required
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="middle_name"
                    label="Middle Name"
                    variant="outlined"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        middle_name: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
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
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
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
          <Card
            variant="outlined"
            style={{ padding: "10px", marginTop: "2rem", marginBottom: "2rem" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                {/* Address Details Text fileds here in a card*/}
                <Grid item xs={12}>
                  <p
                    style={{
                      fontFamily: "Aileron",
                      fontWeight: "900",
                      letterSpacing: "2",
                    }}
                  >
                    Address Details
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="perm_address"
                    label="Permament Address"
                    variant="outlined"
                    required
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        perm_address: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="current_address"
                    label="Current Address"
                    variant="outlined"
                    required
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        current_address: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        citizenship_address: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Contact Details Text fileds here in a card*/}
          <Card
            variant="outlined"
            style={{ padding: "10px", marginTop: "2rem", marginBottom: "2rem" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p
                    style={{
                      fontFamily: "Aileron",
                      fontWeight: "900",
                      letterSpacing: "2",
                    }}
                  >
                    Contact Details
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="phone_number"
                    label="Phone Number"
                    variant="outlined"
                    required
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone_number: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email_address: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="web_site"
                    label="Web Site"
                    variant="outlined"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, web_site: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Parents Details Text fileds here in a card*/}
          <Card
            variant="outlined"
            style={{ padding: "10px", marginTop: "2rem", marginBottom: "2rem" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p
                    style={{
                      fontFamily: "Aileron",
                      fontWeight: "900",
                      letterSpacing: "2",
                    }}
                  >
                    Family Details
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="grandfather_name"
                    label="Grand Father's Name"
                    variant="outlined"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grandfather_name: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        father_name: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* Sensitive Details Text fileds here in a card*/}
          <Card
            variant="outlined"
            style={{ padding: "10px", marginTop: "2rem", marginBottom: "2rem" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p
                    style={{
                      fontFamily: "Aileron",
                      fontWeight: "900",
                      letterSpacing: "2",
                    }}
                  >
                    Sensitive Details
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="citizenship_number"
                    label="Citizenship Number"
                    variant="outlined"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    required
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        citizenship_number: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        license_number: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="passport_number"
                    label="Passport Number"
                    variant="outlined"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passport_number: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="nid_number"
                    label="National Identity Card Number"
                    variant="outlined"
                    style={{ marginBottom: "10px", marginRight: "10px" }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, nid_number: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
export default PersonalIdentity;
