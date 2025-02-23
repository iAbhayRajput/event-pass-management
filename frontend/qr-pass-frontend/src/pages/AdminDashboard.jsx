import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/qr/verified-users").then((res) => setUsers(res.data));
  }, []);

  const toggleUsed = async (uuid, day) => {
    await axios.post("/api/admin/update-pass", { uuid, day });
    setUsers(users.map((user) => (user.uuid === uuid ? { ...user, [day]: !user[day] } : user)));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Day 1 Used</th>
            <th className="border p-2">Day 2 Used</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uuid}>
              <td className="border p-2">{user.userName}</td>
              <td className="border p-2">
                <button onClick={() => toggleUsed(user.uuid, "isUsed1")} className="px-4 py-1 bg-blue-500 rounded">
                  {user.isUsed1 ? "Revert" : "Mark Used"}
                </button>
              </td>
              <td className="border p-2">
                <button onClick={() => toggleUsed(user.uuid, "isUsed2")} className="px-4 py-1 bg-blue-500 rounded">
                  {user.isUsed2 ? "Revert" : "Mark Used"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;