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

router.put("/verifiedusers/:id/toggle-emailed", async (req, res) => {
  try {
    const user = await VerifiedUser.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.emailed = !user.emailed; // Toggle the boolean value
    await user.save();
    
    res.json({ success: true, emailed: user.emailed });
  } catch (error) {
    res.status(500).json({ error: "Failed to update emailed status" });
  }
});

module.exports = router;
