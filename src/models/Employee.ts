// models/Employee.ts

import { Task } from './Task';  // Import Task model

/**
 * Interface for Employee data structure.
 * Represents an employee in the system with their personal information, role, skills, and assigned tasks.
 */
export interface Employee {
    _id: string;              // Unique identifier for the employee (MongoDB ObjectId)
    username: string;         // Employee's username, used for login
    password: string;         // Employee's password (should be hashed in the database)
    firstName: string;        // Employee's first name
    lastName: string;         // Employee's last name
    email: string;            // Employee's email address
    role: "admin" | "manager" | "employee";  // Enum defining the employee's role in the company
    skills: string[];         // List of skills the employee possesses (e.g., JavaScript, React, etc.)
    tasks: Task[];            // Array of tasks assigned to the employee (Task model reference)
}

/**
 * Explanation of the Employee interface:
 * - The Employee interface represents an employee's profile.
 * - The 'role' field uses a union type to define three possible roles: admin, manager, or employee.
 * - 'skills' is an array of strings where each string represents a specific skill the employee has.
 * - 'tasks' holds an array of tasks that are assigned to the employee, with each task being an instance of the Task model.
 * 
 * This model is essential for defining employee data and integrating with other parts of the application like task assignment, user management, and role-based access control.
 */
