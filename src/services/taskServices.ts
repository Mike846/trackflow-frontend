import { Task } from "../models/Task";  // Import Task model

const API_URL = "http://localhost:3000/tasks";

/**
 * Fetches all tasks from the backend API.
 * 
 * @returns {Promise<Task[]>} - A promise that resolves to an array of tasks.
 * @throws {Error} - Throws an error if fetching tasks fails.
 */
export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            // If the response is not ok, throw an error with the message from the server
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch tasks");
        }

        const tasks: Task[] = await response.json();  // Parse tasks from the response
        return tasks;  // Return the list of tasks
    } catch (error: unknown) {
        // If the error is an instance of Error, throw a new error with a custom message
        if (error instanceof Error) {
            throw new Error("Error fetching tasks: " + error.message);
        }
        // For any unknown errors, throw a generic error message
        throw new Error("An unknown error occurred");
    }
};

/**
 * Fetches tasks assigned to a specific employee by their employeeId.
 * 
 * @param {string} employeeId - The ID of the employee whose tasks are to be fetched.
 * @returns {Promise<Task[]>} - A promise that resolves to an array of tasks assigned to the employee.
 * @throws {Error} - Throws an error if fetching tasks fails.
 */
export const getTasksByEmployeeId = async (employeeId: string): Promise<Task[]> => {
    try {
        const response = await fetch(`${API_URL}/employee/${employeeId}`);
        if (!response.ok) {
            // If the response is not ok, throw an error with the message from the server
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch tasks");
        }

        return await response.json();  // Return the tasks assigned to the employee
    } catch (error) {
        // Handle errors during the fetch process
        throw new Error("Failed to fetch: " + (error as Error).message);
    }
};

/**
 * Updates an existing task with new data.
 * 
 * @param {string} taskId - The ID of the task to be updated.
 * @param {Task} taskData - The new task data to be updated.
 * @returns {Promise<Task>} - A promise that resolves to the updated task.
 * @throws {Error} - Throws an error if updating the task fails.
 */
export const updateTask = async (taskId: string, taskData: Task): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            // If the response is not ok, throw an error with the message from the server
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update task");
        }

        const task: Task = await response.json();  // Parse the updated task from the response
        return task;  // Return the updated task
    } catch (error: unknown) {
        // Handle errors during the update process
        if (error instanceof Error) {
            throw new Error("Error updating task: " + error.message);
        }
        // For unknown errors, throw a generic error message
        throw new Error("An unknown error occurred");
    }
};

/**
 * Creates a new task.
 * 
 * @param {Task} taskData - The data for the new task to be created.
 * @returns {Promise<Task>} - A promise that resolves to the newly created task.
 * @throws {Error} - Throws an error if creating the task fails.
 */
export const createTask = async (taskData: Task): Promise<Task> => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            // If the response is not ok, throw an error with the message from the server
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create task");
        }

        return await response.json();  // Return the created task
    } catch (error) {
        // Handle errors during the task creation process
        throw new Error("Error creating task: " + (error as Error).message);
    }
};
