import React from "react";
import { Employee } from "../models/Employee";
import '../App.css'

// Define the props that the EmployeeList component will accept
interface EmployeeListProps {
  employees: Employee[];  // Array of Employee objects to be displayed in the list
}

// EmployeeList component to display a list of employees with their details
const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  // Render the list of employees with details such as name, role, email, and skills
  return (
    <ul className="list-group">
      {employees.map((employee) => (
        <li key={employee._id} className="list-group-item">
          <h5>{employee.firstName} {employee.lastName}</h5> {/* Display employee's full name */}
          <p>Role: {employee.role}</p>  {/* Display employee's role */}
          <p>Email: {employee.email}</p>  {/* Display employee's email */}
          <p>Skills: {employee.skills.join(", ")}</p>  {/* Display employee's skills */}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
