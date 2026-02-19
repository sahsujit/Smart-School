// routes/assignmentRoutes.js
const express = require("express");
const router = express.Router();
const { getTeacherAssignments, createAssignment } = require("../controllers/assignmentController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// Only teachers can create or see their assignments
router.get("/teacher", authMiddleware, roleMiddleware("teacher"), getTeacherAssignments);
router.post("/", authMiddleware, roleMiddleware("teacher"), createAssignment);

module.exports = router;
