const User = require("../models/User");
const Skill = require("../models/Skill");
const SwapRequest = require("../models/SwapRequest");

// Admin login (static credentials)
exports.adminLogin = (req, res) => {
  const { email, password } = req.body;
  if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // create a dummy token for admin
    const token = "admin-static-token-123456789";
    return res.json({ token, admin: true, email });
  }
  return res.status(401).json({ message: "Invalid admin credentials" });
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all skills uploaded by users
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("user", "fullName username email");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all swap requests
exports.getAllSwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find()
      .populate("fromUser", "fullName username")
      .populate("toUser", "fullName username");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
