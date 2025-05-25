// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // apne redux path ke hisaab se adjust kar lena

const Navbar = () => {
  const { user, admin, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!token) {
    // Guest navbar with Login and Register
    return (
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">SkillSwap</Link>
        <div>
          <Link to="/" className="mr-4 hover:text-yellow-300">Home</Link>
          <Link to="/login" className="mr-4 hover:text-yellow-300">Login</Link>
          <Link to="/register" className="hover:text-yellow-300">Register</Link>
        </div>
      </nav>
    );
  }

  if (admin) {
    // Admin navbar
    return (
      <nav className="bg-gradient-to-r from-red-600 to-pink-600 p-4 text-white flex justify-between items-center">
        <Link to="/admin" className="font-bold text-xl">Admin Panel</Link>
        <div>
          <Link to="/admin" className="mr-4 hover:text-yellow-300">Dashboard</Link>
          <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
        </div>
      </nav>
    );
  }

  // User navbar
  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-xl">SkillSwap</Link>
      <div>
        <Link to="/dashboard" className="mr-4 hover:text-yellow-300">Dashboard</Link>
        <Link to="/profile" className="mr-4 hover:text-yellow-300">Profile</Link>
        <Link to="/upload-skills" className="mr-4 hover:text-yellow-300">Upload Skills</Link>
        <Link to="/swap-requests" className="mr-4 hover:text-yellow-300">Swap Requests</Link>
        <button onClick={handleLogout} className="hover:text-yellow-300">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
