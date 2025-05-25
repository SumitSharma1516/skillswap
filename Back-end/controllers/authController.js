const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
exports.register = async (req, res) => {
  try {
    const { fullName, email, username, mobile, dob, password } = req.body;

    if (!fullName || !email || !username || !password || !mobile || !dob) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      username,
      mobile,
      dob,
      password: hash,
    });

    const savedUser = await newUser.save();

    // Generate token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send back user and token (excluding password)
    res.status(201).json({
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        username: savedUser.username,
        mobile: savedUser.mobile,
        dob: savedUser.dob,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ message: "Please enter all fields" });

    const user = await User.findOne({ username });
    if(!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        photo: user.photo,
        bio: user.bio
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
