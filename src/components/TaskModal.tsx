import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'

// Define types for Employee and TaskModalProps
interface Employee {
  _id: string;
  username: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onTaskCreated }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
    assignedTo: "",
  });

  // Fetch employees when the modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  // Fetch employee data from the server
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle input changes in the task creation form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // Handle form submission to create a new task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/tasks/create", taskData);
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // If modal is not open, return null (don't render)
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Status:
            <select name="status" value={taskData.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Deadline:
            <input
              type="datetime-local"
              name="deadline"
              value={taskData.deadline}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Assign To:
            <select name="assignedTo" value={taskData.assignedTo} onChange={handleInputChange} required>
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.username}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Create Task</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
