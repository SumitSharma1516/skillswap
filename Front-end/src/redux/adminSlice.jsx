// /src/redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    adminLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.error = null;
    },
    adminLoginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const {
  adminLoginStart,
  adminLoginSuccess,
  adminLoginFailure,
  adminLogout,
} = adminSlice.actions;

export default adminSlice.reducer;
