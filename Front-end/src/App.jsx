import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import UserDashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminPanel";
import UserProfile from "./pages/Profile";
import UploadSkills from "./pages/SkillUpload";
import SwapRequests from "./pages/SwapRequest";
import PublicSkills from "./pages/PublicSkills";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  const { token, admin } = useSelector((state) => state.auth);

  // Protected route for regular users (non-admin)
  const PrivateRouteUser = ({ children }) => {
    if (!token || admin) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Protected route for admin users
  const PrivateRouteAdmin = ({ children }) => {
    if (!token || !admin) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to={admin ? "/admin" : "/dashboard"} replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Register route */}
        <Route
          path="/register"
          element={token ? (
            <Navigate to={admin ? "/admin" : "/dashboard"} replace />
          ) : (
            <Register />
          )}
        />

        {/* User routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRouteUser>
              <UserDashboard />
            </PrivateRouteUser>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRouteUser>
              <UserProfile />
            </PrivateRouteUser>
          }
        />
        <Route
          path="/upload-skills"
          element={
            <PrivateRouteUser>
              <UploadSkills />
            </PrivateRouteUser>
          }
        />
        <Route
          path="/swap-requests"
          element={
            <PrivateRouteUser>
              <SwapRequests />
            </PrivateRouteUser>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRouteAdmin>
              <AdminDashboard />
            </PrivateRouteAdmin>
          }
        />

        {/* Public routes */}
        {/* Agar user logged in hai, toh '/' se bhi dashboard/admin pe redirect karna */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={admin ? "/admin" : "/dashboard"} replace />
            ) : (
              <Home />
            )
          }
        />

        <Route path="/public-skills" element={<PublicSkills />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
