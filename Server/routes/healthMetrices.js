const express = require('express');
const router = express.Router();
const sql = require('mssql/msnodesqlv8');
const authMiddleware = require('../middleware/auth');

const config = {
  connectionString: "Driver={ODBC Driver 18 for SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=HealthHelp;Trusted_Connection=Yes;Encrypt=no"
};

// GET /api/health-metrics - Fetch health metrics for authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // First get user's phone number
    const pool = await sql.connect(config);
    const userResult = await pool.request()
      .input('Id', sql.Int, userId)
      .query('SELECT PhoneNumber FROM Users WHERE Id = @Id');

    if (!userResult.recordset[0]) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const phoneNumber = userResult.recordset[0].PhoneNumber;

    // Get health metrics for this user
    const metricsResult = await pool.request()
      .input('phoneNumber', sql.NVarChar, phoneNumber)
      .query(`
        SELECT id, metric, value, unit, timestamp 
        FROM HealthMetrics 
        WHERE phoneNumber = @phoneNumber
        ORDER BY timestamp DESC
      `);

    res.status(200).json(metricsResult.recordset);
  } catch (err) {
    console.error('Error fetching health metrics:', err);
    res.status(500).json({ message: 'Server error fetching health metrics.' });
  }
});

// POST /api/health-metrics - Add new health metric
router.post('/', authMiddleware, async (req, res) => {
  let pool;
  try {
    const userId = req.user.id;
    const { metric, value, unit, uniqueKey } = req.body;

    // Validate input
    if (!metric || isNaN(value) || !unit || !uniqueKey) {
      return res.status(400).json({ message: 'Invalid input - missing required fields.' });
    }

    pool = await sql.connect(config);

    // Get user's phone number
    const userResult = await pool.request()
      .input('Id', sql.Int, userId)
      .query('SELECT PhoneNumber FROM Users WHERE Id = @Id');

    if (!userResult.recordset[0]) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const phoneNumber = userResult.recordset[0].PhoneNumber;

    // Check for existing uniqueKey
    const checkResult = await pool.request()
      .input('uniqueKey', sql.NVarChar, uniqueKey)
      .query('SELECT 1 FROM HealthMetrics WHERE uniqueKey = @uniqueKey');

    if (checkResult.recordset.length > 0) {
      return res.status(409).json({ message: 'This health metric record already exists.' });
    }

    // Insert new record
    await pool.request()
      .input('metric', sql.NVarChar, metric)
      .input('value', sql.Decimal(10, 2), value)
      .input('unit', sql.NVarChar, unit)
      .input('phoneNumber', sql.NVarChar, phoneNumber)
      .input('uniqueKey', sql.NVarChar, uniqueKey)
      .query(`
        INSERT INTO HealthMetrics 
          (metric, value, unit, phoneNumber, uniqueKey, timestamp) 
        VALUES 
          (@metric, @value, @unit, @phoneNumber, @uniqueKey, CURRENT_TIMESTAMP)
      `);

    // Get the newly created record
    const newRecordResult = await pool.request()
      .input('uniqueKey', sql.NVarChar, uniqueKey)
      .query(`
        SELECT id, metric, value, unit, phoneNumber, uniqueKey, timestamp 
        FROM HealthMetrics 
        WHERE uniqueKey = @uniqueKey
      `);

    if (!newRecordResult.recordset[0]) {
      return res.status(500).json({ message: 'Failed to retrieve created record.' });
    }

    res.status(201).json(newRecordResult.recordset[0]);
  } catch (err) {
    console.error('Error adding health metric:', err);
    
    // Handle unique key constraint violation specifically
    if (err.number === 2627) { // SQL Server unique constraint violation
      return res.status(409).json({ message: 'This health metric record already exists.' });
    }
    
    res.status(500).json({ message: 'Server error adding health metric.' });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
});

module.exports = router;