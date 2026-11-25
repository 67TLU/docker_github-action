const express = require("express");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend is running"
    });
});

// API routes
app.use("/api/tasks", taskRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;