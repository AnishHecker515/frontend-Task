import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/login"); // Redirect to login page on success
    } else {
      setError(data.error || "Registration failed"); // Show error message
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* ✅ Display error if registration fails */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username:</label>
          <input 
            type="text" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
