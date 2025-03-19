require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

const adminRoutes = require("./routes/adminRoutes");
const agentRoutes = require("./routes/agentRoutes");
const fileUpload = require("./routes/fileUpload");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/upload", fileUpload);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
