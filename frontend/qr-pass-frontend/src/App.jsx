import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
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
          {/* Public Route: Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <QRScanner />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verified-users" 
            element={
              <ProtectedRoute>
                <VerifiedUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-verified" 
            element={
              <ProtectedRoute>
                <AdminVerifiedUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/email-preview/:id" 
            element={
              <ProtectedRoute>
                <EmailPreview />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
