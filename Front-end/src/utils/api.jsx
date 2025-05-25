// src/utils/api.js
import axios from "axios";

export const API_URL = "http://localhost:5000/api"; // Change if your backend is hosted elsewhere

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // optional: if you're using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance; // ✅ THIS IS IMPORTANT
