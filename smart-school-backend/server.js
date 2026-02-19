


// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const adminRoutes = require("./routes/admin");
const assignmentRoutes = require("./routes/assignmentRoutes");
require("dotenv").config();

require("./models/CompletedAssignment");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // Next.js dev server
  "https://smart-school-three.vercel.app", // Deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/assignments", assignmentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Smart School Backend is running ✅");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
