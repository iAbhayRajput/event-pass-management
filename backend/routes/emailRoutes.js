const express = require("express");
const router = express.Router();
const VerifiedUser = require("../models/VerifiedUser"); // ✅ Fix: Correct model import
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

router.post("/send-pass/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("✅ Received userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const user = await VerifiedUser.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await sendEmail(user);
    res.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
