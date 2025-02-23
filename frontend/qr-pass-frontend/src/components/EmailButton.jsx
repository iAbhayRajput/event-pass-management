import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const EmailButton = ({ userId }) => {  // ✅ Corrected parameter name
    const sendEmail = async () => {
        if (!userId) {
            console.error("❌ User ID is missing!");
            return;
        }

        try {
            await axios.post(`${backendUrl}/api/email/send-pass/${user._id}`);
            alert("✅ Email sent successfully!");
        } catch (error) {
            console.error("❌ Failed to send email:", error);
            alert("Failed to send email.");
        }
    };

    return <button onClick={sendEmail}>Send Email</button>;
};

export default EmailButton;
