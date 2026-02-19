const mongoose = require("mongoose"); // ADD THIS
const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ student: req.user._id });
  res.json(tasks);
};

const addTask = async (req, res) => {
  const { title, subject, dueDate } = req.body;
  const task = await Task.create({ student: req.user._id, title, subject, dueDate });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = req.body.completed ?? task.completed;
  await task.save();
  res.json(task);
};

const deleteTask = async (req, res) => {
 try {
    // ✅ Extract id from request parameters
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check ownership
    if (task.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    // Delete task
    await task.deleteOne();

    res.json({ message: "Task removed" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};


module.exports = { getTasks, deleteTask, addTask,updateTask};
