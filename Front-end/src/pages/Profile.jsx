import React, { useEffect, useState } from "react";
import axios from "../utils/api"; // your axios instance with baseURL

const ProfilePage = () => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData((prev) => ({
          ...prev,
          username: res.data.username || "",
        }));

        setPreview(res.data.photo);
      } catch (err) {
        console.error("Failed to fetch profile:", err.message);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("username", formData.username);
      if (formData.password) data.append("password", formData.password);
      if (formData.photo) data.append("photo", formData.photo);

      const res = await axios.put("/user/update", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label className="block font-semibold">Profile Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {preview && (
          <div className="flex justify-center mt-2">
            <img
              src={preview}
              alt="Profile Preview"
              className="h-24 w-24 rounded-full border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
