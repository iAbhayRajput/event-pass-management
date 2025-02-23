const express = require("express");
const router = express.Router();
const VerifiedUser = require("../models/VerifiedUser");

// ✅ Fetch verified users (Admin)
router.get("/verifiedusers", async (req, res) => {
  try {
    const users = await VerifiedUser.find({ isAlreadyPaid: true });
    res.json(users);
  } catch (error) {
    console.error("Error fetching verified users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update pass usage (Checkbox change)
router.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await VerifiedUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user." });
  }
});

module.exports = router;
