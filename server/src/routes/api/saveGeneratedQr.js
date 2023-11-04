const mongoose = require('mongoose');
const express = require('express');
const GeneratedQrModel = require('../../models/GeneratedQrModel'); // Assuming this file is in the same directory

const router = express.Router();

router.post('/save-generated-qr', async (req, res) => {
  try {
    const { user_id, _id, qr_data } = req.body;

    // Save data to the collection
    await GeneratedQrModel.create({
      user_id,
      _id,
      qr_data,
    });

    res.json({ success: true, message: 'QR data saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving QR data' });
  }
});

module.exports = router;
