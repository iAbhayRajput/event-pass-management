const VerifiedUser = require("../models/VerifiedUser");
const generateQR = require("../utils/generateQR");
const emailTemplate = require("../utils/emailTemplate");
const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../config");

// ✅ Create the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: emailUser, pass: emailPass },
});

// ✅ Validate QR Function
const validateQR = async (req, res) => {
  try {
    const { uuid } = req.body;
    const user = await VerifiedUser.findOne({ uuid });

    if (!user) {
      return res.status(404).json({ message: "Invalid QR Code" });
    }

    res.status(200).json({ message: "QR Code is valid", user });
  } catch (error) {
    console.error("Error in validateQR:", error);
    res.status(500).json({ error: "Error validating QR code" });
  }
};

// ✅ Send QR Function (Ensure it's properly defined)
const sendQR = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await VerifiedUser.findOne({ emailId: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Generate QR Code
    const qrCode = await generateQR(user);

    // ✅ Generate Email Content
    const emailContent = emailTemplate(user.userName, user.numberOfPasses, user.uuid, qrCode);

    // ✅ Send Email
    await transporter.sendMail({
      from: emailUser,
      to: user.emailId,
      subject: "Your Event Pass QR Code",
      html: emailContent,
    });

    res.status(200).json({ message: "QR code sent successfully!" });
  } catch (error) {
    console.error("Error in sendQR:", error);
    res.status(500).json({ error: "Error sending QR code" });
  }
};

// ✅ Ensure functions are correctly exported
module.exports = {
  sendQR,      // ✅ sendQR is properly defined before export
  validateQR,  // ✅ validateQR is properly defined before export
};
