const express = require("express");
const router = express.Router();
const { adminLogin, getAllUsers, getAllSkills, getAllSwapRequests } = require("../controllers/adminController");

// Static admin token middleware for admin routes
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  if(token !== "admin-static-token-123456789") {
    return res.status(401).json({ message: "Invalid admin token" });
  }
  next();
};

router.post("/login", adminLogin);
router.get("/users", adminAuth, getAllUsers);
router.get("/skills", adminAuth, getAllSkills);
router.get("/swap-requests", adminAuth, getAllSwapRequests);

module.exports = router;
