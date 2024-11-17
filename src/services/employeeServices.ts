import { Employee } from "../models/Employee";

const API_URL = "http://localhost:3000/employees";

/**
 * Logs in an employee by sending a POST request with their credentials.
 * If successful, the employee's data is returned and stored in localStorage.
 * 
 * @param {string} username - The username of the employee trying to log in.
 * @param {string} password - The password of the employee trying to log in.
 * @returns {Promise<Employee>} - Returns a promise that resolves to the employee object upon successful login.
 * @throws {Error} - Throws an error if the login request fails.
 */
export const loginEmployee = async (username: string, password: string): Promise<Employee> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // If the response is not ok (status code other than 2xx), throw an error with the message from the server
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        // Parse the employee data from the response body
        const employee: Employee = await response.json();
        
        // Save employee ID in localStorage for session persistence
        localStorage.setItem("employeeId", employee._id); // Save employee ID in local storage
        
        // Return the employee data
        return employee;
    } catch (error) {
        // Catch any errors in the process and throw a new error with a message
        throw new Error("Failed to fetch: " + (error as Error).message);
    }
};

/**
 * Fetches the list of employees from the backend API.
 * 
 * @returns {Promise<Employee[]>} - Returns a promise that resolves to an array of employees.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchEmployees = async (): Promise<Employee[]> => {
    try {
        // Send a GET request to the API to fetch the list of employees
        const response = await fetch(API_URL);

        if (!response.ok) {
            // If the response is not ok (status code other than 2xx), throw an error with the message from the server
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch employees");
        }

        // Parse the list of employees from the response body
        const employees: Employee[] = await response.json();

        // Return the list of employees
        return employees;
    } catch (error: unknown) {
        // If the error is an instance of Error, catch it and throw a new error with the message
        if (error instanceof Error) {
            throw new Error("Error fetching employees: " + error.message);
        }
        // If the error is not of type Error, throw a general error message
        throw new Error("An unknown error occurred");
    }
};
