import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminVerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/verifiedusers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-4">
      <table className="min-w-full bg-gray-800 text-white border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border">Unique Code</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">View Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center border border-gray-700">
              <td className="p-2">{user.uniqueCode}</td>
              <td className="p-2">{user.userName}</td>
              <td className="p-2">{user.emailId}</td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => navigate(`/email-preview/${user._id}`)}
                >
                  View Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVerifiedUsers;
