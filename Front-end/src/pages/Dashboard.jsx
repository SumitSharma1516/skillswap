import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo?.token;

  console.log("Dashboard rendered with token:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <div>Your Dashboard - User is logged in</div>;
};

export default Dashboard;
