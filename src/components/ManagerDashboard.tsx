import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/employeeServices";
import { fetchTasks } from "../services/taskServices";
import { Employee } from "../models/Employee";
import { Task } from "../models/Task";
import TaskList from "../components/TaskList";
import EmployeeList from "./EmployeeList";
import TaskModal from "../components/TaskModal";
import '../App.css'

// ManagerDashboard component displays tasks and employees for the manager
const ManagerDashboard: React.FC = () => {
  // State variables for tasks, employees, loading, and modal state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch data for tasks and employees when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks(); // Fetch all tasks
        const employees = await fetchEmployees(); // Fetch all employees
        setTasks(tasks); // Update tasks state
        setEmployees(employees); // Update employees state
      } catch (error) {
        console.error("Failed to fetch data", error); // Log any error
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Handle task creation and close modal
  const handleTaskCreated = () => {
    console.log("Task created successfully!");
    setIsModalOpen(false); // Close modal after task is created
  };

  return (
    <div className="container mt-5">
      <h1>Manager Dashboard</h1>
      <div className="row">
        {/* Display task list */}
        <div className="col-md-6">
          <h2>All Tasks</h2>
          <TaskList tasks={tasks} />
        </div>
        {/* Display employee list */}
        <div className="col-md-6">
          <h2>All Employees</h2>
          <EmployeeList employees={employees} />
        </div>
      </div>
      <div className="mt-4">
        {/* Button to open task creation modal */}
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          Add Task
        </button>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default ManagerDashboard;
