// controllers/noticeController.js
const Notice = require("../models/Notice");

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a notice (teacher only)
const createNotice = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const notice = await Notice.create({ title, description });
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllNotices, createNotice };
