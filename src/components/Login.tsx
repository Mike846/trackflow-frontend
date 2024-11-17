import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEmployee } from "../services/employeeServices";  // Import the service
import { Employee } from "../models/Employee";
import '../App.css'

// Login component for employee authentication
const Login: React.FC = () => {
  // State variables for username, password, and error message
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();  // Hook for navigation

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent default form submission

    try {
      // Attempt to login the employee
      const employee: Employee = await loginEmployee(username, password);
      
      // Store the logged-in employee's data in localStorage
      localStorage.setItem("employee", JSON.stringify(employee));

      // Navigate based on the employee's role
      switch (employee.role) {
        case "admin":
          navigate("/admin-dashboard");  // Redirect to Admin dashboard
          break;
        case "manager":
          navigate("/manager-dashboard");  // Redirect to Manager dashboard
          break;
        case "employee":
          navigate("/employee-dashboard");  // Redirect to Employee dashboard
          break;
        default:
          throw new Error("Invalid role");  // Handle invalid role
      }
    } catch (err) {
      // Handle errors if login fails
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        {error && <p className="error-message">{error}</p>}  {/* Display error message */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
