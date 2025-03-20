const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

const router = express.Router();

// File upload settings
const upload = multer({ dest: "uploads/" });

// Validate and process file
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const AdminId = req.query.adminId;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileExt = req.file.originalname.split(".").pop().toLowerCase();
    if (!["csv", "xlsx", "xls"].includes(fileExt)) {
      console.log("Invalid file type:", fileExt);
      return res.status(400).json({ error: "Invalid file type" });
    }

    let tasks = [];

    if (fileExt === "csv") {
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", (row) => {
          tasks.push(row);
        })
        .on("end", async () => {
          await processAndDistributeTasks(tasks, res, AdminId);
        });
    } else {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      tasks = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      await processAndDistributeTasks(tasks, res, AdminId);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Server error" });
  }
});

async function processAndDistributeTasks(tasks, res, adminId) {
  const agents = await Agent.find({ adminId });

  if (agents.length === 0) {
    console.log("No agents found in DB!");
    return res.status(400).json({ error: "No agents available" });
  }

  const distributedTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const agentIndex = i % agents.length;
    const taskData = {
      firstName: tasks[i].FirstName || tasks[i].firstName, // Handle both cases
      phone: tasks[i].Phone || tasks[i].phone,
      notes: tasks[i].Notes || tasks[i].notes,
      assignedTo: agents[agentIndex]._id,
      adminId: adminId, // ✅ Ensure this field is included
    };

    const task = new Task(taskData);
    await task.save();
    distributedTasks.push(task);
  }

  res.status(201).json({
    message: "Tasks uploaded and distributed",
    tasks: distributedTasks,
  });
}

module.exports = router;
