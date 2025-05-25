const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { sendRequest, getMyRequests, updateRequestStatus } = require("../controllers/swapController");

router.post("/send", authMiddleware, sendRequest);
router.get("/my", authMiddleware, getMyRequests);
router.put("/update/:requestId", authMiddleware, updateRequestStatus);

module.exports = router;
