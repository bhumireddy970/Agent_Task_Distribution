const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const Admin = require("../models/Admin"); // Ensure Admin model is imported

const router = express.Router();

// Add Task (Requires adminId)
router.post("/", async (req, res) => {
  const { firstName, phone, notes, assignedTo, adminId } = req.body;

  if (!adminId) {
    return res.status(400).json({ error: "Admin ID is required" });
  }

  try {
    // Ensure admin exists before assigning a task
    const adminExists = await Admin.findById(adminId);
    if (!adminExists) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const newTask = new Task({
      firstName,
      phone,
      notes,
      assignedTo,
      adminId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Tasks for a Specific Admin
router.get("/admin/:adminId", async (req, res) => {
  try {
    const adminId = new mongoose.Types.ObjectId(req.params.adminId); // Convert to ObjectId
    const tasks = await Task.find({ adminId }).populate("assignedTo", "name");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
