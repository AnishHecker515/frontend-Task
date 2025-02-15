// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/Tasks";

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/tasks" element={<Tasks />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById("root")
// );



import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Import createRoot from React 18
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

// ✅ Get the root element
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// ✅ Use createRoot() instead of render()
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  </React.StrictMode>
); 