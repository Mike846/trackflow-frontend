import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/employeeServices";
import { fetchTasks } from "../services/taskServices";
import { Employee } from "../models/Employee";
import { Task } from "../models/Task";
import TaskList from "../components/TaskList";
import EmployeeList from "./EmployeeList";
import TaskModal from "../components/TaskModal";
import '../App.css'

// AdminDashboard component that handles the admin's task and employee views.
const AdminDashboard: React.FC = () => {
  // State variables for tasks, employees, loading state, and modal visibility.
  const [tasks, setTasks] = useState<Task[]>([]); // Holds tasks data
  const [employees, setEmployees] = useState<Employee[]>([]); // Holds employees data
  const [loading, setLoading] = useState<boolean>(true); // Tracks loading state
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state for adding a task

  // Fetches employees and tasks from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks and employees simultaneously
        const tasks = await fetchTasks();
        const employees = await fetchEmployees();
        setTasks(tasks);  // Set tasks state
        setEmployees(employees);  // Set employees state
      } catch (error) {
        // Handle error in fetching data
        console.error("Failed to fetch data", error);
      } finally {
        // Ensure loading is set to false after data fetching attempt
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // If the data is still loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // Handles task creation success, closes the modal and logs success
  const handleTaskCreated = () => {
    try {
      console.log("Task created successfully!");
      setIsModalOpen(false);  // Close the modal once the task is created
    } catch (error) {
      // Log error if task creation fails
      console.error("Error handling task creation", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Admin Dashboard</h1> {/* Center title with margin-bottom */}
      
      <div className="row">
        {/* Left Column for Tasks */}
        <div className="col-md-6">
          <h2 className="mb-4">All Tasks</h2> {/* Margin bottom for heading */}
          <TaskList tasks={tasks} />
        </div>
        
        {/* Right Column for Employees */}
        <div className="col-md-6">
          <h2 className="mb-4">All Employees</h2>
          <EmployeeList employees={employees} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 d-flex justify-content-between">
        <button 
          className="btn btn-primary me-2" 
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </button>
        <button className="btn btn-secondary">
          Add Employee
        </button>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}  // Modal open state
        onClose={() => setIsModalOpen(false)}  // Closes the modal
        onTaskCreated={handleTaskCreated}  // Callback for task creation success
      />
    </div>
  );
};

export default AdminDashboard;
