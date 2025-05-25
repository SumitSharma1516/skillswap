// src/pages/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import axios, { setAuthToken } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Static admin credentials
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    dispatch(loginStart());

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Admin login success
      try {
        const token = "static-admin-token-123";
        const adminData = { username: "admin" };

        setAuthToken(token);
        dispatch(loginSuccess({ isAdmin: true, admin: adminData, token }));
        navigate("/admin");
      } catch (err) {
        dispatch(loginFailure("Admin login failed"));
        setError("Admin login failed");
      }
      return;
    }

    try {
      // User login API call
      const res = await axios.post("/auth/login", { username, password });
      const { token, user } = res.data;
        //  console.log(res.data.token)
         localStorage.setItem('token',res.data.token)
      setAuthToken(token);
      dispatch(loginSuccess({ isAdmin: false, user, token }));
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      dispatch(loginFailure(msg));
      setError(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
