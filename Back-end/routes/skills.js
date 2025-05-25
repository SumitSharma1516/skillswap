const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { uploadSkills, getAllSkills } = require("../controllers/skillsController");

router.post("/upload", authMiddleware, uploadSkills);
router.get("/all", getAllSkills); // public endpoint

module.exports = router;
