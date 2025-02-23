const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");

const SECRET_KEY = "your_secret_key"; // Use a secure key

const sendEmail = async (user) => {
    try {
        // Encrypt UUID
        const encryptedUUID = CryptoJS.AES.encrypt(user.uuid.toString(), SECRET_KEY).toString();
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(encryptedUUID)}`;

        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const emailHtml = `
        <div style="text-align: center; background: black; color: white; padding: 20px; border: 2px solid red; max-width: 400px; margin: auto; border-radius: 10px;">
            <h1 style="color: red;">Welcome to Prisma</h1>
            <p>Your unique pass is here...</p>

            <div style="text-align: left; padding: 10px; background: #2a2a2a; border-radius: 5px;">
                <p><strong>Name:</strong> ${user.userName}</p>
                <p><strong>Pass Valid for:</strong> ${user.numberOfPasses} person(s)</p>
                <p><strong>Unique Code:</strong> ${user.uniqueCode}</p>
            </div>

            <div style="margin-top: 20px;">
                <img src="${qrCodeUrl}" alt="Your Unique QR Code" />
            </div>

            <p><strong>Note:</strong> This QR code is valid for both <b>February 28th and March 1st</b>. Please keep it safe, as it will be required for entry.</p>
            <p style="color: orange;"><strong>Important:</strong> Please do not attempt to alter or manipulate the QR code.</p>

            <p style="font-size: 12px; color: gray;">This is an auto-generated email. <strong>Do not reply.</strong><br>Regards,<br>Prisma Team</p>
        </div>
        `;

        const mailOptions = {
            from: "srmuhprisma@gmail.com",
            to: user.emailId,
            subject: "Your Prisma Event Pass",
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${user.emailId}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};

module.exports = sendEmail;
