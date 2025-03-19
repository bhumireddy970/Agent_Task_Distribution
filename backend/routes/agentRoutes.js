const express = require("express");
const bcrypt = require("bcryptjs");
const Agent = require("../models/Agent");

const router = express.Router();

// Add Agent
router.post("/", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (error) {
    console.error("Error adding agent:", error);
    res.status(500).json({ error: "Error adding agent" });
  }
});

// Get All Agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching agents" });
  }
});

// Delete Agent
router.delete("/:id", async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing agent" });
  }
});

module.exports = router;
