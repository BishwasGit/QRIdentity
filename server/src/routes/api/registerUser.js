const express = require('express');
const bcrypt = require('bcrypt');
const Registration = require('../../models/registrationModel');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const registration = await Registration.create({ username, email, password: hashedPassword });
        res.status(201).json({ success: true, message: 'User registered successfully', user: registration });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
    }
});

module.exports = router;
