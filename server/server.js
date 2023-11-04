require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.nljmvzn.mongodb.net/${process.env.DB_NAME}`;
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
// const registrationRoutes = require('./src/routes/registrationRoutes');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// app.use('/api', registrationRoutes);
app.use('/api', require('./src/routes/api/checkEmail'));
app.use('/api', require('./src/routes/api/registerUser'));
app.use('/api', require('./src/routes/api/loginUser'));
app.use('/api', require('./src/routes/api/getData'));
app.use('/api', require('./src/routes/api/personalIdentityRegistration'));
app.use('/api', require('./src/routes/api/fetchPersonalIdentityData'));
app.use('/api', require('./src/routes/api/saveGeneratedQr'));
app.use('/api', require('./src/routes/api/generateQr'));




