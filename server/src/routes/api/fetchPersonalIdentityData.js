const express = require('express');
const Personal_Identity_Registration = require("../../models/personalIdentityModel");

const router = express.Router();

// Endpoint to get personal identity data
router.get('/get-personal-identity-data/:user_id', async (req, res) => {
    const { user_id } = req.params;
  try {
    const data = await Personal_Identity_Registration.find({user_id});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
