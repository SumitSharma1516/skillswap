require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173", // ✅ specify your frontend URL here
  credentials: true                // ✅ allow credentials (cookies, auth headers)
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/skills", require("./routes/skills"));  
app.use("/api/swap", require("./routes/swap"));
app.use("/api/admin", require("./routes/admin"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
