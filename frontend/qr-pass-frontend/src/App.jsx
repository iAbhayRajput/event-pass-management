import { Routes, Route } from "react-router-dom";  // ✅ Removed duplicate Router
import Navbar from "./components/Navbar";
import QRScanner from "./components/QRScanner";
import VerifiedUsers from "./components/VerifiedUsers";
import AdminVerifiedUsers from "./components/AdminVerifiedUsers";
import AdminPage from "./pages/AdminPage";
import EmailPreview from "./pages/EmailPreview";

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Event Pass Verification</h1>
        <Routes>
          <Route path="/" element={<QRScanner />} />  {/* ✅ QR Scanner is Home */}
          <Route path="/verified-users" element={<VerifiedUsers />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-verified" element={<AdminVerifiedUsers />} />
          <Route path="/email-preview/:id" element={<EmailPreview />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
