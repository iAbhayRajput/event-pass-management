const express = require("express");
const router = express.Router();
const VerifiedUser = require("../models/VerifiedUser"); // ✅ Correct
 // Make sure this path is correct

router.get("/", async (req, res) => {
  try {
    const users = await VerifiedUser.find({ isAlreadyPaid: true }); // Filter only paid users
    res.json(users); // Send response as JSON
  } catch (error) {
    console.error("Error fetching verified users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update Pass Usage (Checkbox Change)
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

  router.post("/add", async (req, res) => {
    try {
      const newUser = new VerifiedUser(req.body);
      await newUser.save();
      res.json({ success: true, message: "User added successfully" });
    } catch (error) {
      console.error("❌ Error Adding User:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Delete a verified user
  router.delete("/:id", async (req, res) => {
    try {
      await VerifiedUser.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("❌ Error Deleting User:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
  module.exports = router;
  
