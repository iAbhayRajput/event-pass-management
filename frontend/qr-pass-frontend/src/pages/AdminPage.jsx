import AdminVerifiedUsers from "../components/AdminVerifiedUsers";

const AdminPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Verified Users</h2>
      <AdminVerifiedUsers />
    </div>
  );
};

export default AdminPage;
