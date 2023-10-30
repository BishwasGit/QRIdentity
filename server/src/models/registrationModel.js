const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const Registration = mongoose.model('Registration', registrationSchema, 'registrations');

module.exports = Registration;
