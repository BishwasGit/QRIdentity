const express = require('express');
const bcrypt = require('bcrypt');
const Registration = require('../../models/registrationModel');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Registration.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ success: true, message: 'Login successful', user: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
