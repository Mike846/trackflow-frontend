import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";

// Main App component, setting up routing for different views based on user roles
const App: React.FC = () => {
    return (
        <Router>  {/* Router component handles routing in the app */}
            <Routes> {/* Defines the routes for different pages */}
                {/* Route for the login page */}
                <Route path="/" element={<Login />} />
                
                {/* Route for the employee dashboard */}
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                
                {/* Route for the manager dashboard */}
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                
                {/* Route for the admin dashboard */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
