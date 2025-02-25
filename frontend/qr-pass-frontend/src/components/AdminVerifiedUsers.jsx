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

  const openEmailPreview = (userId) => {
    window.open(`/email-preview/${userId}`, "_blank"); // Opens EmailPreview in a new tab
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

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid white" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Email</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Unique Code</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Emailed</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ backgroundColor: user.emailed ? "#a3e635" : "#f87171" }}>
                <td style={{ padding: "10px", border: "1px solid black" }}>{user.userName}</td>
                <td style={{ padding: "10px", border: "1px solid black" }}>{user.emailId}</td>
                <td style={{ padding: "10px", border: "1px solid black" }}>{user.uniqueCode}</td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  {user.emailed ? "✅ Sent" : "❌ Not Sent"}
                </td>
                <td style={{ padding: "10px", border: "1px solid black" }}>
                  <button 
                    onClick={() => openEmailPreview(user._id)} 
                    style={{ padding: "5px 10px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}>
                    Preview Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVerifiedUsers;
