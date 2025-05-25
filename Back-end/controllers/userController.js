const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile (username, bio, photo, password)
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ message: "User not found" });

    const { username, bio, password } = req.body;

    if(username) user.username = username;
    if(bio) user.bio = bio;

    if(req.file) {
      user.photo = req.file.filename; // from multer upload
    }

    if(password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
