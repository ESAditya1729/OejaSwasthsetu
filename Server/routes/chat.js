const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig"); // Adjust this path if your DB connection is elsewhere

// Route: Send a message
router.post("/send", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.request()
      .input("SenderId", senderId)
      .input("ReceiverId", receiverId)
      .input("Content", message)
      .query(`
        INSERT INTO Messages (SenderId, ReceiverId, Content, Timestamp)
        VALUES (@SenderId, @ReceiverId, @Content, GETDATE())
      `);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Route: Get chat history between two users
router.get("/history/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params;

  try {
    const result = await db.request()
      .input("User1", userId)
      .input("User2", otherUserId)
      .query(`
        SELECT * FROM Messages
        WHERE (SenderId = @User1 AND ReceiverId = @User2)
           OR (SenderId = @User2 AND ReceiverId = @User1)
        ORDER BY Timestamp ASC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

module.exports = router;
