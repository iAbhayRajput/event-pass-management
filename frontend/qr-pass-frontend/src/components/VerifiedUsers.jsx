import { useState, useEffect } from "react";
import axios from "axios";
import "./VerifiedUsers.css";

const VerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/verifiedusers")
      .then((res) => {
        console.log("Fetched users:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  // 🔍 Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phoneNumber.includes(searchQuery) ||
    user.emailId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.uniqueCode.toString().includes(searchQuery)
  );

  // ✅ Function to handle checkbox update
  const handleCheckboxChange = (userId, field, currentValue) => {
    const confirmChange = window.confirm(`Are you sure you want to change ${field} for this user?`);
    if (!confirmChange) return;

    axios
      .put(`http://localhost:5000/api/verifiedusers/update/${userId}`, { [field]: !currentValue })
      .then((res) => {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, [field]: !currentValue } : user
        ));
      })
      .catch((err) => console.error("Error updating:", err));
  };

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

      <div className="table-container">
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
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
                    <input
                      type="checkbox"
                      checked={user.isUsed1}
                      onChange={() => handleCheckboxChange(user._id, "isUsed1", user.isUsed1)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.isUsed2}
                      onChange={() => handleCheckboxChange(user._id, "isUsed2", user.isUsed2)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No verified users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifiedUsers;
