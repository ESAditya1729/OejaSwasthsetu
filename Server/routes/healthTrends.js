const express = require('express');
const sql = require('mssql');
const { config } = require('../db/dbConfig');
const router = express.Router();

// POST: Add or Update health trend data
router.post('/', async (req, res) => {
  const { userId, category, month, value } = req.body;

  if (!userId || !category || !month || value === undefined) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const pool = await sql.connect(config);

    // Check if data for the same month and category exists
    const existing = await pool.request()
      .input('UserId', sql.Int, userId)
      .input('Category', sql.NVarChar, category)
      .input('Month', sql.VarChar, month)
      .query(`
        SELECT * FROM HealthTrends 
        WHERE UserId = @UserId AND Category = @Category AND Month = @Month
      `);

    if (existing.recordset.length > 0) {
      // Update existing value
      await pool.request()
        .input('UserId', sql.Int, userId)
        .input('Category', sql.NVarChar, category)
        .input('Month', sql.VarChar, month)
        .input('Value', sql.Float, value)
        .query(`
          UPDATE HealthTrends
          SET Value = @Value, UpdatedAt = GETDATE()
          WHERE UserId = @UserId AND Category = @Category AND Month = @Month
        `);

      return res.status(200).json({ message: 'Trend updated successfully.' });
    } else {
      // Insert new record
      await pool.request()
        .input('UserId', sql.Int, userId)
        .input('Category', sql.NVarChar, category)
        .input('Month', sql.VarChar, month)
        .input('Value', sql.Float, value)
        .query(`
          INSERT INTO HealthTrends (UserId, Category, Month, Value)
          VALUES (@UserId, @Category, @Month, @Value)
        `);

      return res.status(201).json({ message: 'Trend added successfully.' });
    }
  } catch (err) {
    console.error('Health trend error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET: Fetch trend data for a specific user and category
router.get('/:userId/:category', async (req, res) => {
  const { userId, category } = req.params;

  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('UserId', sql.Int, userId)
      .input('Category', sql.NVarChar, category)
      .query(`
        SELECT Month, Value
        FROM HealthTrends
        WHERE UserId = @UserId AND Category = @Category
        ORDER BY Month ASC
      `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Get trends error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
