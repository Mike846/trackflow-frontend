// models/Task.ts

import { Employee } from "./Employee";  // Import the Employee model

/**
 * Interface for Task data structure.
 * Represents a task assigned to an employee, with details about its status, description, and deadline.
 */
export interface Task {
    _id: string;                // Unique identifier for the task (MongoDB ObjectId)
    title: string;              // Title or name of the task (e.g., "Complete Report")
    description: string;        // Detailed description of the task's requirements or objectives
    status: string;             // Status of the task (e.g., "Pending", "In Progress", "Completed")
    deadline: string;           // Deadline for the task in ISO 8601 date format (e.g., "2024-12-31T23:59:59")
    assignedTo: Employee;       // Employee assigned to the task (references Employee model)
}

/**
 * Explanation of the Task interface:
 * - The Task interface represents a task assigned to an employee.
 * - The 'status' field indicates the current progress of the task and could have values like "Pending", "In Progress", or "Completed".
 * - The 'assignedTo' field now references an instance of the Employee model, ensuring that the task is always linked to a valid employee.
 * 
 * This model is crucial for managing tasks within the system, including assigning them to employees, tracking their status, and setting deadlines.
 */
