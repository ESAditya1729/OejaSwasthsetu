const express = require('express');
const router = express.Router();
const sql = require('mssql/msnodesqlv8');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// SQL config
const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=HealthHelp;Trusted_Connection=Yes;Encrypt=no",
};

// Upload folder setup
const uploadFolder = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Utility: Artificial delay (e.g., to simulate latency or processing)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Upload profile picture route
router.post('/', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const profilePicPath = `/uploads/${req.file.filename}`;

  try {
    // Optional: simulate delay (e.g., 500ms)
    await delay(500);

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Id', sql.Int, req.user.id)
      .input('ProfilePicURL', sql.NVarChar, profilePicPath)
      .query('UPDATE Users SET ProfilePicURL = @ProfilePicURL WHERE Id = @Id');

    res.status(200).json({
      message: 'Profile picture updated.',
      profilePicURL: profilePicPath,
    });
  } catch (err) {
    console.error('Error updating profile picture:', err);
    res.status(500).json({ message: 'Failed to update profile picture.' });
  }
});

module.exports = router;
