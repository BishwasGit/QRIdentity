const mongoose = require('mongoose');

const generatedQrSchema = new mongoose.Schema({
  user_id: String,
  _id: String,
  qr_data: String,
});

const GeneratedQrModel = mongoose.model('GeneratedQr', generatedQrSchema,'personal_identity_generated_qr');

module.exports = GeneratedQrModel;
