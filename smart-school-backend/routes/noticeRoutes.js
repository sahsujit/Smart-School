// routes/noticeRoutes.js
const express = require("express");
const router = express.Router();
const { getAllNotices, createNotice } = require("../controllers/noticeController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// Everyone can see notices
router.get("/", getAllNotices);

// Only teachers can create notices
router.post("/", authMiddleware, roleMiddleware("teacher"), createNotice);

module.exports = router;
