import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminVerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/verifiedusers`);
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmails = async () => {
    if (sending) return; // Prevent duplicate starts
    setSending(true);

    let emailQueue = users.filter(user => !user.emailed); // Get users who haven't been emailed

    if (emailQueue.length === 0) {
      console.log("✅ All users have already received emails.");
      setSending(false);
      return;
    }

    let index = 0;

    const emailInterval = setInterval(async () => {
      if (index >= emailQueue.length) {
        clearInterval(emailInterval);
        console.log("✅ All emails sent!");
        setSending(false);
        fetchUsers(); // Refresh user data
        return;
      }

      const user = emailQueue[index];

      try {
        const response = await axios.post(`${backendUrl}/api/email/send-pass/${user._id}`);
        console.log(`✅ Email sent to: ${user.userName} (${user.email})`);

        // Update the user's emailed status
        await axios.put(`${backendUrl}/api/admin/verifiedusers/${user._id}`, { emailed: true });

        index++; // Move to the next user
      } catch (error) {
        console.error(`❌ Failed to send email to ${user.userName}:`, error);
      }
    }, 180000); // 3 minutes interval (180,000 ms)
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Verified Users</h1>
      <button 
        onClick={sendEmails} 
        disabled={sending} 
        style={{ 
          padding: "10px 20px", 
          background: sending ? "gray" : "red", 
          color: "white", 
          border: "none", 
          borderRadius: "5px",
          cursor: sending ? "not-allowed" : "pointer"
        }}>
        {sending ? "Sending Emails..." : "Send Emails"}
      </button>
      <p>{sending ? "Emails are being sent. Please wait..." : "Click to send emails to all unnotified users."}</p>
    </div>
  );
};

export default AdminVerifiedUsers;
