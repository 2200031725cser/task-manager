const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./tasks.json";

// Load tasks from file
let tasks = [];

try {
  const data = fs.readFileSync(FILE_PATH);
  tasks = JSON.parse(data);
} catch (err) {
  tasks = [];
}

// Helper function to save tasks
const saveTasks = () => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

// GET /tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks();

  res.status(201).json(newTask);
});

// PATCH /tasks/:id
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Update title
  if (title !== undefined) {
    if (!title.trim()) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    task.title = title;
  }

  // Update completed
  if (completed !== undefined) {
    task.completed = completed;
  }

  saveTasks();

  res.json(task);
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const exists = tasks.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();

  res.json({ message: "Task deleted" });
});

// Start server ONLY if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;