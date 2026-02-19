// // controllers/assignmentController.js
// const Assignment = require("../models/Assignment");

// // Get all assignments for a teacher
// const getTeacherAssignments = async (req, res) => {
//   try {
//     const teacherId = req.user._id; // authMiddleware sets req.user
//     const assignments = await Assignment.find({ teacher: teacherId }).sort({ createdAt: -1 });
//     res.json(assignments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create assignment (teacher only)
// const createAssignment = async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     const assignment = await Assignment.create({
//       title,
//       description,
//       teacher: req.user._id,
//     });
//     res.status(201).json(assignment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getTeacherAssignments, createAssignment };
















// controllers/assignmentController.js
const Assignment = require("../models/Assignment");

const getTeacherAssignments = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const assignments = await Assignment.find({ teacher: teacherId }).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAssignment = async (req, res) => {
  const { title, subject, dueDate } = req.body;
  try {
    const assignment = await Assignment.create({
      title,
      subject,
      dueDate,
      teacher: req.user._id,
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTeacherAssignments, createAssignment };
