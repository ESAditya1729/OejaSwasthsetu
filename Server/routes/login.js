const express = require("express");
const router = express.Router();
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { config } = require("../db/dbConfig"); // Use shared config
const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

// -------- PHONE NUMBER LOGIN --------
router.post("/", async (req, res) => {
  const { phone_number, password } = req.body;

  if (!phone_number || !password) {
    return res.status(400).json({ message: "Phone number and password are required." });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("PhoneNumber", sql.NVarChar, phone_number)
      .query("SELECT * FROM Users WHERE PhoneNumber = @PhoneNumber");

    const user = result.recordset[0];
    if (!user) {
      // Delay response to reduce brute-force accuracy
      await new Promise((resolve) => setTimeout(resolve, 500));
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        phone_number: user.PhoneNumber,
        role: user.Role
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      userId: user.Id,
      role: user.Role,
      firstName: user.FirstName,
      lastName: user.LastName,
      phoneNumber: user.PhoneNumber,
      profilePicURL: user.ProfilePicURL,
      redirectUrl: `/${user.Role}/home`
    });
  } catch (err) {
    console.error("Phone Login Error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});

// -------- OEJAHEALTH ID LOGIN --------
router.post("/oeja", async (req, res) => {
  const { oeja_id } = req.body;

  if (!oeja_id) {
    return res.status(400).json({ message: "OejaHealth ID is required." });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Id", sql.Int, parseInt(oeja_id))
      .query("SELECT * FROM Users WHERE Id = @Id");

    const user = result.recordset[0];
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        phone_number: user.PhoneNumber,
        role: user.Role
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      userId: user.Id,
      role: user.Role,
      firstName: user.FirstName,
      lastName: user.LastName,
      phoneNumber: user.PhoneNumber,
      profilePicURL: user.ProfilePicURL,
      redirectUrl: `/${user.Role}/home`
    });
  } catch (err) {
    console.error("OejaHealth Login Error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
