import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GenerateQr() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  let { userId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/get-personal-identity-data/${userId}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleGenerateQR = async (rowData) => {
    console.log(rowData);

    const qrData = JSON.stringify(rowData);

    try {
      const qr_response = await fetch(
        `http://localhost:5000/api/generate-qr/${qrData}`
      );
      const qrdata = await qr_response.json();

      const store_response = await fetch(
        "http://localhost:5000/api/save-generated-qr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: rowData.user_id,
            _id: rowData._id,
            qr_data: qrData,
          }),
        }
      );

      if (qrdata.success) {
        const qrCodeUrl = qrdata.qrCodeUrl;
        console.log("QR Code URL:", qrCodeUrl);
        // You can use the QR code URL to display or download the QR code
        // Example: display it in an image element
        const qrCodeImage = document.createElement("img");
        qrCodeImage.src = qrCodeUrl;
        setQrCodeUrl(qrCodeUrl);
        // document.body.appendChild(qrCodeImage);
        const qrImageContainer = document.getElementById("qr-image");
        qrImageContainer.innerHTML = "";
        qrImageContainer.appendChild(qrCodeImage);
        handleOpen();
      } else {
        console.error("Error generating QR code:", qrdata.message);
      }

      const store_data = await store_response.json();
      if (store_data.success) {
        // Handle success (e.g., show a success message to the user)
        alert("QR data saved successfully");
      } else {
        // Handle error
        alert(
          "Error saving QR data: " +
          store_data.message +
            "Or the data already exists ! "
        );
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network error
    }
  };
  const downloadQRCode = () => {
    const qrImageElement = document.getElementById("qr-image");
    const qrImageUrl = qrImageElement.firstChild.src; // Get the base64 source
    const date = new Date().getFullYear(); // Corrected the syntax
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.target = "_blank"; // Open the link in a new tab
    link.download = `qr_code_${date}_${data[0].phone_number}.png`; // Added backticks for string interpolation
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div
      style={{
        padding: "5rem",
      }}
    >
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "3rem" }}
        >
          Back to Dashboard
        </Button>
      </Link>
      <Grid container spacing={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Citizenship Number</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.perm_address}</TableCell>
                  <TableCell align="right">{row.phone_number}</TableCell>
                  <TableCell align="right">{row.email_address}</TableCell>
                  <TableCell align="right">{row.citizenship_number}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        handleGenerateQR(row);
                        handleOpen();
                      }}
                    >
                      Generate Qr
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Here is your QR code :
          </Typography>
          <Typography id="qr-image" sx={{ mt: 2 }}>
            <img src={qrCodeUrl} alt="QR Code" />
          </Typography>
          <Button
            variant="contained"
            color="error"
            style={{
              float: "right",
            }}
            onClick={downloadQRCode}
          >
            Download QR Code
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
