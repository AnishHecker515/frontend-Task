

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // ✅ State for error message
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const response = await fetch("http://localhost:8000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({ email, password }),
//       credentials: "include",
//     });

//     if (response.ok) {
//       navigate("/dashboard"); // ✅ Redirect to dashboard on success
//     } else {
//       setError("Invalid credentials"); // ❌ Display error message if login fails
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       {error && <div className="alert alert-danger">{error}</div>} {/* ✅ Show error message */}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email:</label>
//           <input 
//             type="email" 
//             className="form-control" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password:</label>
//           <input 
//             type="password" 
//             className="form-control" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button className="btn btn-primary" type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
