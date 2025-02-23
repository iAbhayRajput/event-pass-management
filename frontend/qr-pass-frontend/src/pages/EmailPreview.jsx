// ✅ Ensure all required dependencies are imported
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as CryptoJS from "crypto-js";
import * as html2canvas from "html2canvas";

// ✅ Ensure SECRET_KEY is a non-empty string
const SECRET_KEY = "your_secret_key"; // Change to a secure key

const EmailPreview = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const emailRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/verifiedusers`)
      .then((res) => {
        const foundUser = res.data.find((u) => u._id === id);
        setUser(foundUser || null);
      })
      .catch((err) => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  // ✅ Ensure `user.uuid` exists before encryption
  let encryptedUUID = "";
  try {
    if (user.uuid) {
      encryptedUUID = CryptoJS.AES.encrypt(user.uuid.toString(), SECRET_KEY).toString();
    } else {
      throw new Error("UUID is missing");
    }
  } catch (error) {
    console.error("Encryption error:", error);
    return <p>Error: Invalid QR Code Data</p>;
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(encryptedUUID)}`;

  // ✅ Copy QR Code URL to clipboard
  const copyQRCode = () => {
    navigator.clipboard.writeText(qrCodeUrl);
    alert("QR Code copied to clipboard!");
  };

  // ✅ Download the full email as an image
  const downloadAsImage = () => {
    if (emailRef.current) {
      html2canvas(emailRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${user.userName}_pass.png`;
        link.click();
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div ref={emailRef} className="p-6 border border-red-500 bg-gray-900 rounded-lg max-w-lg">
        <h1 className="text-red-500 text-2xl font-bold text-center">Welcome to Prisma</h1>
        <p className="text-center">Your unique pass is here...</p>
        
        <div className="p-4 bg-gray-800 rounded-md mt-4">
          <p><strong>Name:</strong> {user.userName}</p>
          <p><strong>Pass Valid for:</strong> {user.numberOfPasses} person(s)</p>
          <p><strong>Unique Code:</strong> {user.uniqueCode}</p>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <img src={qrCodeUrl} alt="QR Code" className="border p-2 bg-white rounded-md" />
          
          <div className="mt-2 flex space-x-4">
            <button onClick={copyQRCode} className="bg-blue-500 text-white px-3 py-1 rounded-md">
              Copy QR Code
            </button>
            <button onClick={downloadAsImage} className="bg-green-500 text-white px-3 py-1 rounded-md">
              Download as Image
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-orange-400">
          <strong>Important:</strong> Do not attempt to alter or manipulate the QR code.
        </p>
        <p className="text-center text-gray-400 text-sm mt-4">
          This is an auto-generated email. <strong>Do not reply.</strong><br />
          Regards,<br />
          Prisma Team
        </p>
      </div>
    </div>
  );
};

export default EmailPreview;
