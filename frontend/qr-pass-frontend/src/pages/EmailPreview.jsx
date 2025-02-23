import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your_secret_key";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EmailPreview = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [encryptedUUID, setEncryptedUUID] = useState("");

  useEffect(() => {
    axios.get(`${backendUrl}/api/admin/verifiedusers`)
      .then(res => {
        const foundUser = res.data.find((u) => u._id.toString() === id);
        if (foundUser) {
          setUser(foundUser);
          const encrypted = CryptoJS.AES.encrypt(foundUser.uuid.toString(), SECRET_KEY).toString();
          setEncryptedUUID(encrypted);
        }
      })
      .catch(err => console.error("❌ Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const sendEmail = async () => {
    if (!user || !user._id) {
      console.error("❌ User ID is missing!");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/email/send-pass/${user._id}`);
      console.log("✅ Email sent:", response.data);
    } catch (error) {
      console.error("❌ Failed to send email:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div style={{ textAlign: "center", background: "black", color: "white", padding: "20px", border: "2px solid red", maxWidth: "400px", margin: "auto", borderRadius: "10px" }}>
      <h1 style={{ color: "red" }}>Welcome to Prisma</h1>
      <p>Your unique pass is here...</p>
      <div style={{ textAlign: "left", padding: "10px", background: "#2a2a2a", borderRadius: "5px" }}>
        <p><strong>Name:</strong> {user.userName}</p>
        <p><strong>Pass Valid for:</strong> {user.numberOfPasses} person(s)</p>
        <p><strong>Unique Code:</strong> {user.uniqueCode}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(encryptedUUID)}`} alt="Your Unique QR Code" />
      </div>
      <p><strong>Note:</strong> This QR code is valid for both <b>February 28th and March 1st</b>. Please keep it safe, as it will be required for entry.</p>
      <button onClick={sendEmail} style={{ display: "block", margin: "10px auto", padding: "10px", background: "red", color: "white", border: "none", borderRadius: "5px" }}>
        Send Email
      </button>
    </div>
  );
};

export default EmailPreview;
