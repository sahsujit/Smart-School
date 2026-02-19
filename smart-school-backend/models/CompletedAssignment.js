const mongoose = require("mongoose");

const completedAssignmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  },
  { timestamps: true }
);

// Prevent duplicate completions
completedAssignmentSchema.index({ student: 1, assignment: 1 }, { unique: true });

module.exports = mongoose.model("CompletedAssignment", completedAssignmentSchema);