const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
require('dotenv').config();
const { config } = require('../db/dbConfig');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// Utility function to validate required fields
function isValidRegistration({ phone_number, password, role }) {
  return phone_number && password && role;
}

router.post('/', async (req, res) => {
  const {
    first_name,
    last_name,
    dob,
    gender,
    father_name,
    phone_number,
    email,
    pharmacy_name,
    city,
    open_time,
    close_time,
    hospital_name,
    address,
    contact,
    password,
    role,
    profile_pic_url = null
  } = req.body;

  if (!isValidRegistration({ phone_number, password, role })) {
    return res.status(400).json({ error: "Phone number, password, and role are required." });
  }

  try {
    const pool = await sql.connect(config);

    // Check if user already exists
    const checkUser = await pool.request()
      .input('PhoneNumber', sql.NVarChar, phone_number)
      .query("SELECT Id FROM Users WHERE PhoneNumber = @PhoneNumber");

    if (checkUser.recordset.length > 0) {
      return res.status(409).json({ error: "Phone number is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await pool.request()
      .input('FirstName', sql.NVarChar, first_name || null)
      .input('LastName', sql.NVarChar, last_name || null)
      .input('DateOfBirth', sql.Date, dob || null)
      .input('Gender', sql.NVarChar, gender || null)
      .input('FatherName', sql.NVarChar, father_name || null)
      .input('PhoneNumber', sql.NVarChar, phone_number)
      .input('Email', sql.NVarChar, email || null)
      .input('PharmacyName', sql.NVarChar, pharmacy_name || null)
      .input('City', sql.NVarChar, city || null)
      .input('OpenTime', sql.Time, open_time || null)
      .input('CloseTime', sql.Time, close_time || null)
      .input('HospitalName', sql.NVarChar, hospital_name || null)
      .input('Address', sql.NVarChar, address || null)
      .input('Contact', sql.NVarChar, contact || null)
      .input('Password', sql.NVarChar, hashedPassword)
      .input('Role', sql.NVarChar, role)
      .input('ProfilePicURL', sql.NVarChar, profile_pic_url || null)
      .query(`
        INSERT INTO Users (
          FirstName, LastName, DateOfBirth, Gender, FatherName,
          PhoneNumber, Email, PharmacyName, City, OpenTime, CloseTime,
          HospitalName, Address, Contact, Password, Role, ProfilePicURL
        )
        VALUES (
          @FirstName, @LastName, @DateOfBirth, @Gender, @FatherName,
          @PhoneNumber, @Email, @PharmacyName, @City, @OpenTime, @CloseTime,
          @HospitalName, @Address, @Contact, @Password, @Role, @ProfilePicURL
        )
      `);

    // Retrieve the new user's ID
    const result = await pool.request()
      .input('PhoneNumber', sql.NVarChar, phone_number)
      .query("SELECT Id FROM Users WHERE PhoneNumber = @PhoneNumber");

    const userId = result.recordset[0]?.Id;

    if (!userId) {
      return res.status(500).json({ error: "Registration failed. Please try again." });
    }

    const token = jwt.sign(
      { id: userId, phone_number, role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      role,
      redirectUrl: `/${role}/home`
    });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
});

module.exports = router;
