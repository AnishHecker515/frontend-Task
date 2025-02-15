// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/tasks", { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => setTasks(data))
//       .catch(() => console.error("Failed to load tasks."));
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h2>Your Tasks</h2>
//         <ul className="list-group">
//           {tasks.map((task) => (
//             <li key={task._id} className="list-group-item">
//               {task.title} - {task.status}
//             </li>
//           ))}
//         </ul>
//         <Link to="/tasks" className="btn btn-primary mt-3">Go to Tasks</Link>
//       </div>
//     </>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch Tasks
  useEffect(() => {
    fetch("http://localhost:8000/tasks", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => setError("Failed to load tasks."));
  }, []);

  // ✅ Download Specific Task as PDF
  const handleDownloadPDF = (taskId) => {
    window.open(`http://localhost:8000/tasks/export/pdf/${taskId}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Your Tasks</h2>

        {/* ✅ Show Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <ul className="list-group">
          {tasks.length === 0 ? (
            <li className="list-group-item">No tasks available. Add some tasks!</li>
          ) : (
            tasks.map((task) => (
              <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{task.title}</strong> - {task.status}
                </div>
                <div>
                  {/* ✅ Download Button */}
                  <button className="btn btn-sm btn-info" onClick={() => handleDownloadPDF(task._id)}>
                    Download PDF
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* ✅ Go to Tasks Page */}
        <Link to="/tasks" className="btn btn-primary mt-3">Go to Tasks</Link>
      </div>
    </>
  );
};

export default Dashboard;
