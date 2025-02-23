import { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const VerifiedList = () => {
  const [users, setUsers] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('${backendUrl}/api/verifiedusers') // Ensure the endpoint is correct
      .then((res) => {
        console.log("Fetched users:", res.data); // Debugging
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Verified Users</h2>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user, index) => (
          <div key={index}>
            <p>Name: {user.userName}</p>
            <p>Email: {user.emailId}</p>
          </div>
        ))
      ) : (
        <p>No verified users found.</p>
      )}
    </div>
  );
};

export default VerifiedList;
