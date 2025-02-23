import { useState, useEffect } from "react";
import axios from "axios";
import "./VerifiedUsers.css"; // Import the styles

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const VerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("backendUrl/api/verifiedusers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phoneNumber.includes(searchQuery) ||
    user.emailId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.uniqueCode.includes(searchQuery)
  );

  return (
    <div className="verified-users-container">
      <h2>Verified Users</h2>
      <input
        type="text"
        placeholder="Search by name, phone, email, or code..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <table className="verified-users-table">
        <thead>
          <tr>
            <th>Unique Code</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Passes</th>
            <th>Amount</th>
            <th>Purchase Date</th>
            <th>ID Proof</th>
            <th>Status</th>
            <th>Pass 1</th>
            <th>Pass 2</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.uniqueCode}>
              <td>{user.uniqueCode}</td>
              <td>{user.userName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.emailId}</td>
              <td>{user.numberOfPasses}</td>
              <td>₹{user.amount}</td>
              <td>{new Date(user.purchaseDate).toLocaleDateString()}</td>
              <td>
                <button className="view-id-btn" onClick={() => alert("ID Proof: " + user.idProofImage)}>
                  View ID
                </button>
              </td>
              <td>
                <span className={user.isAlreadyPaid ? "status-paid" : "status-unpaid"}>
                  {user.isAlreadyPaid ? "Verified" : "Not Paid"}
                </span>
              </td>
              <td>
                <input type="checkbox" checked={user.isUsed1} readOnly />
              </td>
              <td>
                <input type="checkbox" checked={user.isUsed2} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifiedUsers;
