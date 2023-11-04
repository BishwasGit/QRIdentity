const express = require('express');

const qrcode = require('qrcode'); // Import the qrcode library
const router = express.Router();

router.get('/generate-qr/:data', (req, res) => {
  const { data } = req.params;

  console.log(data);
  
  qrcode.toDataURL(data, (err, url) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error generating QR code' });
    } else {
      res.json({ success: true, qrCodeUrl: url });
    }
  });
});

module.exports = router;

