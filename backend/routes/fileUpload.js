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
    console.log("Received file:", req.file);

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("Processing file:", req.file.originalname);

    const fileExt = req.file.originalname.split(".").pop().toLowerCase();
    if (!["csv", "xlsx", "xls"].includes(fileExt)) {
      console.log("Invalid file type:", fileExt);
      return res.status(400).json({ error: "Invalid file type" });
    }

    let tasks = [];

    if (fileExt === "csv") {
      console.log("Processing CSV file...");
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", (row) => {
          console.log("CSV Row:", row);
          tasks.push(row);
        })
        .on("end", async () => {
          await processAndDistributeTasks(tasks, res);
        });
    } else {
      console.log("Processing Excel file...");
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      tasks = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log("Extracted Excel Data:", tasks);
      await processAndDistributeTasks(tasks, res);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Server error" });
  }
});

async function processAndDistributeTasks(tasks, res) {
  const agents = await Agent.find();
  console.log("Fetched Agents:", agents);

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
    };

    console.log("Saving Task:", taskData); // Debugging

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
