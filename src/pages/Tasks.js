


import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // ✅ Import Navbar

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");

  // ✅ Fetch tasks from backend when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks.");
    }
  };

  // ✅ Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add task");
      }

      await fetchTasks(); // ✅ Refresh task list after adding
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
      setError(error.message);
    }
  };

  // ✅ Handle updating task status
  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/update/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update task");

      await fetchTasks(); // ✅ Refresh task list after update
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task.");
    }
  };

  // ✅ Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/delete/${taskId}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      await fetchTasks(); // ✅ Refresh task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task.");
    }
  };

  // ✅ Handle downloading tasks as PDF
  const handleDownloadPDF = (taskId) => {
    window.open(`http://localhost:8000/tasks/export/pdf/${taskId}`, "_blank");
  };

  // ✅ Start editing a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate.split("T")[0]); // Convert date to correct format
  };

  // ✅ Save edited task
  const handleSaveEditTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://localhost:8000/tasks/edit/${editingTask._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task");
      }

      await fetchTasks(); // ✅ Refresh task list
      resetForm();
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message);
    }
  };

  // ✅ Reset form fields after adding or editing
  const resetForm = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar */}
      <div className="container mt-5">
        <h2>Manage Tasks</h2>

        {/* ✅ Show error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* ✅ Task Form (For Adding or Editing) */}
        <form onSubmit={editingTask ? handleSaveEditTask : handleAddTask}>
          <div className="mb-3">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Due Date:</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success" type="submit">
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
          {editingTask && (
            <button className="btn btn-secondary ms-2" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>

        <hr />

        {/* ✅ Task List */}
        <h3>Your Tasks</h3>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong> - {task.status}
                <p>{task.description}</p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                {/* ✅ Edit Task */}
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditTask(task)}>
                  Edit
                </button>

                {/* ✅ Update Status */}
                <select
                  className="form-select form-select-sm"
                  value={task.status}
                  onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* ✅ Delete Task */}
                <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>

                {/* ✅ Download PDF */}
                <button className="btn btn-sm btn-info ms-2" onClick={() => handleDownloadPDF(task._id)}>
                  Download PDF
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tasks;
