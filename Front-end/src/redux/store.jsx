// /src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import  authSlice  from "./authSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    auth: authSlice,
  },
});

export default store;
