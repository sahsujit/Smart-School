

const express = require("express");
const router = express.Router();
const {
  getAllAssignments,
  createAssignment,
  getTeacherAssignments,
} = require("../controllers/assignmentController");

const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const CompletedAssignment = require("../models/CompletedAssignment");
const Assignment = require("../models/Assignment");

// Everyone logged in can fetch assignments
router.get("/public", getAllAssignments);

// Teacher-only dashboard
router.get("/teacher", authMiddleware, roleMiddleware("teacher"), getTeacherAssignments);

// Teacher-only: create assignments
router.post("/", authMiddleware, roleMiddleware("teacher"), createAssignment);

// ✅ Student: get their completed assignments
router.get("/completed", authMiddleware, async (req, res) => {
  try {
    const completed = await CompletedAssignment.find({ student: req.user._id });
    res.json(completed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Student: toggle assignment complete/incomplete
router.post("/complete/:id", authMiddleware, async (req, res) => {
  try {
    const existing = await CompletedAssignment.findOne({
      student: req.user._id,
      assignment: req.params.id,
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({ message: "Marked incomplete", completed: false });
    }

    // Verify assignment exists
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await CompletedAssignment.create({
      student: req.user._id,
      assignment: req.params.id,
    });

    res.json({ message: "Marked complete", completed: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;