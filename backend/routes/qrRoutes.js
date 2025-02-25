const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const VerifiedUser = require("../models/VerifiedUser"); // Adjust based on your project
const CryptoJS = require("crypto-js");

const SECRET_KEY = "your_secret_key"; // Ensure consistency with frontend encryption

router.post("/validateQR", async (req, res) => {
    try {
        const { encryptedQR, eventDay } = req.body;

        // ✅ Decrypt the QR code
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedQR, SECRET_KEY);
        const decryptedUUID = parseInt(decryptedBytes.toString(CryptoJS.enc.Utf8));

        if (isNaN(decryptedUUID)) {
            return res.status(400).json({ message: "Invalid QR Code Data" });
        }

        // ✅ Find user in database by uuid
        const user = await VerifiedUser.findOne({ uuid: decryptedUUID });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Determine event day
        let currentDay;
        if (eventDay) {
            currentDay = parseInt(eventDay); // Use manual input if provided
        } else {
            currentDay = new Date().getDate(); // Default to system date
        }

        // ✅ Construct the welcome message
        const welcomeMessage = `Welcome, ${user.userName}!\nNumber of persons: ${user.numberOfPasses}\n`;

        if (currentDay === 25) {
            // ✅ First Day Check
            if (user.isUsed1) {
                return res.status(400).json({ message: `${welcomeMessage}❌ Pass already used for Day 1.` });
            }
            user.isUsed1 = true;
        } else if (currentDay === 26) {
            // ✅ Second Day Check
            if (user.isUsed2) {
                return res.status(400).json({ message: `${welcomeMessage}❌ Pass already used for Day 2.` });
            }
            user.isUsed2 = true;
        } else {
            return res.status(400).json({ message: "Passes already used or invalid date." });
        }

        await user.save(); // ✅ Save updated user status

        res.json({ message: `${welcomeMessage}✅ Pass verification successful!` });

    } catch (error) {
        console.error("QR validation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
