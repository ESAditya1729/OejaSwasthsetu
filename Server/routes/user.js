const express = require('express');
const router = express.Router();
const sql = require('mssql/msnodesqlv8');
const authMiddleware = require('../middleware/auth');

const config = {
  connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=HealthHelp;Trusted_Connection=Yes;Encrypt=no"
};

// GET /api/user - Fetch user info using JWT
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Id', sql.Int, userId)
      .query('SELECT * FROM Users WHERE Id = @Id');

    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Respond with user info
    res.status(200).json({
      id: user.Id,
      firstName: user.FirstName,
      lastName: user.LastName,
      phoneNumber: user.PhoneNumber,
      profilePicURL: user.ProfilePicURL,
      role: user.Role,
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error fetching user.' });
  }
});

module.exports = router;
