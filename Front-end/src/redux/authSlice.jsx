// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,       // logged in user info
  admin: null,      // logged in admin info
  token: null,      // auth token
  loading: false,   // request loading state
  error: null       // error message if any
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user || null;
      state.admin = action.payload.admin || null;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.admin = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },

    // Optional: agar chaho to yeh add kar sakte ho for directly setting credentials
    setCredentials: (state, action) => {
      const { user, admin, token } = action.payload;
      state.user = user || null;
      state.admin = admin || null;
      state.token = token || null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setCredentials, // agar chaho to use kar sakte ho
} = authSlice.actions;

export default authSlice.reducer;
