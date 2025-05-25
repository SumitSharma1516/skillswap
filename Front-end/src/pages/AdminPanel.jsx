import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { adminInfo } = useSelector((state) => state.admin);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersRes = await axios.get("/admin/users");
        const skillsRes = await axios.get("/admin/skills");
        setUsers(usersRes.data.users);
        setSkills(skillsRes.data.skills);
      } catch (error) {
        console.error("Admin fetch error:", error);
      }
    };

    if (adminInfo?.token) {
      fetchAdminData();
    }
  }, [adminInfo]);

  if (!adminInfo?.token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Registered Users</h3>
        <div className="overflow-auto max-h-80">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">Full Name</th>
                <th className="border px-3 py-2">Username</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Mobile</th>
                <th className="border px-3 py-2">DOB</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="border px-3 py-2">{u.fullName}</td>
                  <td className="border px-3 py-2">{u.username}</td>
                  <td className="border px-3 py-2">{u.email}</td>
                  <td className="border px-3 py-2">{u.mobile}</td>
                  <td className="border px-3 py-2">{u.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Uploaded Skills</h3>
        <div className="overflow-auto max-h-80">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Description</th>
                <th className="border px-3 py-2">Uploaded By</th>
                <th className="border px-3 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s._id}>
                  <td className="border px-3 py-2">{s.title}</td>
                  <td className="border px-3 py-2">{s.description}</td>
                  <td className="border px-3 py-2">{s.uploadedBy}</td>
                  <td className="border px-3 py-2">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
