const mongoose = require('mongoose');

const personalidentity_registrationSchema = new mongoose.Schema({
    user_id: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    gender : String,
    perm_address: String,
    current_address : String,
    citizenship_address : String,
    city : String,
    country : String,
    phone_number : String,
    email_address : String,
    web_site : String,
    grandfather_name : String,
    father_name : String,
    citizenship_number: String,
    license_number : String,
    passport_number : String,
    nid_number: String,
});

const Personal_Identity_Registration = mongoose.model('Personal Identity Registration', personalidentity_registrationSchema, 'personal_identity_registration');

module.exports = Personal_Identity_Registration;
