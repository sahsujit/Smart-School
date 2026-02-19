

const express = require("express");
const router = express.Router();
const {
  getAllAssignments,
  createAssignment,
  getTeacherAssignments,
} = require("../controllers/assignmentController");

const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// Everyone logged in can fetch assignments
router.get("/public", getAllAssignments);

// Teacher-only dashboard
router.get("/teacher", authMiddleware, roleMiddleware("teacher"), getTeacherAssignments);

// Teacher-only: create assignments
router.post("/", authMiddleware, roleMiddleware("teacher"), createAssignment);

module.exports = router;
