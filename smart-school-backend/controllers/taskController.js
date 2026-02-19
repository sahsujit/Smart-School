const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ student: req.user._id });
  res.json(tasks);
};

exports.addTask = async (req, res) => {
  const { title, subject, dueDate } = req.body;
  const task = await Task.create({ student: req.user._id, title, subject, dueDate });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.completed = req.body.completed ?? task.completed;
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.remove();
  res.json({ message: "Task removed" });
};
