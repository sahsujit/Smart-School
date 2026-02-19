// const Assignment = require("../models/Assignment");

// // Get all assignments (for students)
// exports.getAllAssignments = async (req, res) => {
//   try {
//     let assignments;

//     if (req.user.role === "teacher") {
//       // Teacher sees only their own assignments
//       assignments = await Assignment.find({ teacher: req.user._id })
//         .populate("teacher", "name email")
//         .sort({ createdAt: -1 });
//     } else {
//       // Student sees all assignments from all teachers
//       assignments = await Assignment.find()
//         .populate("teacher", "name email")
//         .sort({ createdAt: -1 });
//     }

//     res.status(200).json(assignments);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch assignments", error: err.message });
//   }
// };


// // Get assignments created by logged-in teacher
// exports.getTeacherAssignments = async (req, res) => {
//   try {
//     const assignments = await Assignment.find({ teacher: req.user._id })
//       .populate("teacher", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json(assignments);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch teacher assignments",
//       error: err.message,
//     });
//   }
// };

// // Create assignment (teacher only)
// exports.createAssignment = async (req, res) => {
//   try {
//     const { title, subject, dueDate } = req.body;
//     const assignment = new Assignment({
//       title,
//       subject,
//       dueDate,
//       teacher: req.user._id,
//     });
//     await assignment.save();
//     res.status(201).json(assignment);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create assignment", error: err.message });
//   }
// };


















const Assignment = require("../models/Assignment");

// For students and teachers
getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assignments", error: err.message });
  }
};


// Teacher-only: create assignment
createAssignment = async (req, res) => {
  try {
    const { title, subject, dueDate } = req.body;

    const assignment = new Assignment({
      title,
      subject,
      dueDate,
      teacher: req.user._id,
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create assignment", error: err.message });
  }
};

// Optional: teacher dashboard can also call this endpoint
getTeacherAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacher: req.user._id })
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch teacher assignments", error: err.message });
  }
};


module.exports = { getAllAssignments, createAssignment, getTeacherAssignments };