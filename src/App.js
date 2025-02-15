const express = require("express");
const Task = require("../models/Task");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// 🔹 Ensure Authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

// 🔹 Fetch Tasks
router.get("/tasks", requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.session.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// 🔹 Add Task
router.post("/tasks/add", requireAuth, async (req, res) => {
  const { title, description, dueDate } = req.body;
  await Task.create({ user: req.session.userId, title, description, dueDate, status: "Pending" });
  res.redirect("/tasks");
});

// 🔹 Delete Task
router.post("/tasks/delete/:id", requireAuth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks");
});

module.exports = router;
