const express = require("express");
const bcrypt = require("bcrypt");
const Personal_Identity_Registration = require("../../models/personalIdentityModel");

const router = express.Router();

router.post("/personal-identity-registration", async (req, res) => {
  const { 
    user_id,
    first_name,
    middle_name,
    last_name,
    gender,
    perm_address,
    current_address,
    citizenship_address,
    city,
    country,
    phone_number,
    email_address,
    web_site,
    grandfather_name,
    father_name,
    citizenship_number,
    license_number,
    passport_number,
    nid_number,
    } = req.body;

    
  try {
    const existingCitizenship = await Personal_Identity_Registration.findOne({ citizenship_number });
    const existingLicense = await Personal_Identity_Registration.findOne({ license_number });
    const existingPassport = await Personal_Identity_Registration.findOne({ passport_number });
    const existingNid = await Personal_Identity_Registration.findOne({ nid_number });
    if (existingCitizenship) {
        return res.status(400).json({
          success: false,
          message: "Citizenship number already exists",
        });
      }
    if (existingLicense) {
        return res.status(400).json({
          success: false,
          message: "License number already exists",
        });
      }
    if (existingPassport) {
        return res.status(400).json({
          success: false,
          message: "Passport number already exists",
        });
      }
    if (existingNid) {
        return res.status(400).json({
          success: false,
          message: "NID number already exists",
        });
      }
    const personal_identity_registration =
      await Personal_Identity_Registration.create({
        user_id,
        first_name,
        middle_name,
        last_name,
        gender,
        perm_address,
        current_address,
        citizenship_address,
        city,
        country,
        phone_number,
        email_address,
        web_site,
        grandfather_name,
        father_name,
        citizenship_number,
        license_number,
        passport_number,
        nid_number,
      });
    res
      .status(201)
      .json({
        success: true,
        message: "Data for personal identity stored successfully, Now you can generate a QR",
        user: personal_identity_registration,
      });
      console.log(personal_identity_registration);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error registering user",
        error: error.message,
      });
  }
});


module.exports = router;
