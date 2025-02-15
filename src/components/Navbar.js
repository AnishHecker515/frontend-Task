import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8000/logout", { method: "GET" });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">Task Manager</Link>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
