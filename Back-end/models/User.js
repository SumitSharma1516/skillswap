const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  photo: { type: String, default: "" }, // filename stored
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
