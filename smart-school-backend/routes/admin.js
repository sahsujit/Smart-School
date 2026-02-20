// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const Task = require("../models/Task");
// const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// // Get all students and their progress
// router.get("/students-progress", authMiddleware, roleMiddleware("teacher"), async (req, res) => {
//   try {
//     const students = await User.find({ role: "student" });
//     const result = [];

//     for (const student of students) {
//       const tasks = await Task.find({ user: student._id });
//       const completed = tasks.filter(t => t.completed).length;
//       const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
//       result.push({
//         student: student.name,
//         email: student.email,
//         progress,
//       });
//     }

//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;















// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const Task = require("../models/Task");
// const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// // Get all students and their progress
// router.get("/students-progress", authMiddleware, roleMiddleware("teacher"), async (req, res) => {
//   try {
//     const students = await User.find({ role: "student" });
//     const result = [];

//     for (const student of students) {
//       // Use 'student' field from Task model, not 'user'
//       const tasks = await Task.find({ student: student._id });
//       const completed = tasks.filter(t => t.completed).length;
//       const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

//       result.push({
//         student: student.name,
//         email: student.email,
//         progress,
//       });
//     }

//     res.json(result);
//   } catch (err) {
//     console.error("Error fetching student progress:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

























const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const Assignment = require("../models/Assignment");
const CompletedAssignment = require("../models/CompletedAssignment");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// Get all students and their progress (tasks + assignments)
router.get("/students-progress", authMiddleware, roleMiddleware("teacher"), async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    const totalAssignments = await Assignment.countDocuments();
    const result = [];

    for (const student of students) {
      // ── Task Progress ──
      const tasks = await Task.find({ student: student._id });
      const completedTasks = tasks.filter((t) => t.completed).length;
      const taskProgress =
        tasks.length === 0
          ? 0
          : Math.round((completedTasks / tasks.length) * 100);

      // ── Assignment Progress ──
      const completedAssignmentsCount = await CompletedAssignment.countDocuments({
        student: student._id,
      });
      const assignmentProgress =
        totalAssignments === 0
          ? 0
          : Math.round((completedAssignmentsCount / totalAssignments) * 100);

      // ── Overall (average of both) ──
      // const overallProgress = Math.round((taskProgress + assignmentProgress) / 2);
const hasTasks       = tasks.length > 0;
const hasAssignments = totalAssignments > 0;

const overallProgress =
  !hasTasks && !hasAssignments ? 0
  : !hasTasks                  ? assignmentProgress
  : !hasAssignments            ? taskProgress
  : Math.round((taskProgress + assignmentProgress) / 2);



      result.push({
        student: { name: student.name, email: student.email },
        progress: taskProgress,
        assignmentProgress: assignmentProgress,
        overallProgress: overallProgress,
        // Extra detail for teacher
        taskStats: { completed: completedTasks, total: tasks.length },
        assignmentStats: { completed: completedAssignmentsCount, total: totalAssignments },
      });
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching student progress:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;