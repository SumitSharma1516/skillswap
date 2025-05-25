const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { getProfile, updateProfile } = require("../controllers/userController");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile-update", authMiddleware, upload.single("photo"), updateProfile);

module.exports = router;
