import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
      setError("");
    } catch {
      setError("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error();

      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  // Toggle task
  const toggleTask = async (task) => {
    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Update task title
  const updateTask = async (id) => {
    if (!editText.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editText }),
      });

      setEditingId(null);
      setEditText("");
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

return (
  <div className="container">
    <h2>Task Manager</h2>

    {/* Add Task */}
    <form onSubmit={addTask}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">Add</button>
    </form>

    {/* Filters */}
    <div className="filters">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>

    {loading && <p className="loading">Loading...</p>}
    {error && <p className="error">{error}</p>}

    {/* Task List */}
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          {editingId === task.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => updateTask(task.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span
                className={`task-text ${
                  task.completed ? "completed" : ""
                }`}
                onClick={() => toggleTask(task)}
              >
                {task.title}
              </span>

              <div className="actions">
                <button
                  className="edit"
                  onClick={() => {
                    setEditingId(task.id);
                    setEditText(task.title);
                  }}
                >
                  ✏️
                </button>

                <button onClick={() => deleteTask(task.id)}>❌</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;