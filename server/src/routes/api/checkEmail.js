const express = require('express');
const Registration = require('../../models/registrationModel');

const router = express.Router();

router.post('/check-email', async (req, res) => {
    const { email } = req.body;

    try {
        const user_email = await Registration.findOne({ email });
        res.json({ exists: !!user_email });
    } catch (error) {
        res.status(500).json({ message: 'Error checking email', error });
    }
});

module.exports = router;
