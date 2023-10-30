const express = require('express');
const Registration = require('../../models/registrationModel');

const router = express.Router();
router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await Registration.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching user details', error: error.message });
    }
  });
  

  module.exports = router;