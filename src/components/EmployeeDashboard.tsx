import React, { useEffect, useState } from "react";
import { getTasksByEmployeeId } from "../services/taskServices";
import { Task } from "../models/Task";
import TaskList from "../components/TaskList";
import '../App.css'

// EmployeeDashboard component that displays tasks for a specific employee
const EmployeeDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);  // Holds tasks data for the employee
  const [loading, setLoading] = useState<boolean>(true);  // Tracks loading state
  const [error, setError] = useState<string | null>(null);  // Holds error message

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const employeeId = localStorage.getItem("employeeId");  // Retrieve employee ID from local storage
      if (!employeeId) {
        setError("Employee ID not found. Please log in again.");  // Error if employee ID is not found
        setLoading(false);
        return;
      }

      try {
        // Fetch tasks for the employee by ID
        const tasks = await getTasksByEmployeeId(employeeId);
        setTasks(tasks);  // Set tasks state if successful
      } catch (error) {
        setError("Failed to fetch tasks");  // Error if the fetch operation fails
      } finally {
        setLoading(false);  // Set loading state to false after the fetch attempt
      }
    };

    fetchTasks();
  }, []);  // Dependency array ensures this effect runs only once on mount

  // Display loading message while fetching data
  if (loading) return <p>Loading...</p>;

  // Display error message if an error occurs
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h1>Employee Dashboard</h1>
      <h2>Your Tasks</h2>
      <TaskList tasks={tasks} />  {/* Render the list of tasks */}
    </div>
  );
};

export default EmployeeDashboard;
