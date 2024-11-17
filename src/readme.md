# TrackFlow Frontend

The frontend for **TrackFlow** is a React.js web application that helps manage employees, tasks, and services within a business. It provides different dashboards for employees, managers, and admins, each with tailored views and functionalities.

## Features

- **Employee Login**: Employees can log in using their credentials to access the dashboard.
- **Employee Dashboard**: Displays assigned tasks, task details, and the ability to update task statuses.
- **Manager Dashboard**: Allows managers to view all tasks, assign tasks to employees, and monitor task progress.
- **Admin Dashboard**: Provides admin functionality to manage employees, view detailed reports, and oversee the entire system.
- **Task Management**: Add, update, and track tasks assigned to employees with deadlines, status updates, and descriptions.
- **Role-Based Access Control**: Different views and permissions are provided based on the role (Employee, Manager, Admin).

## Tech Stack

- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **React Router**: For client-side routing between pages.
- **Axios**: To make HTTP requests to the backend API.
- **CSS/SCSS**: For styling the app with a responsive and user-friendly interface.
- **Bootstrap**: A front-end framework for building responsive and mobile-first web pages.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16.x or above)
- **npm** (Node Package Manager)

### Installation

1. Clone the repository:

   git clone <https://github.com/Mike846/trackflow-frontend.git>
   cd trackflow-frontend
2. Start the backend application:
    nest start
3. Start this application
    npm start

### Routing

The app uses **React Router** to handle navigation between pages:

- **`/`** - Login page
- **`/employee-dashboard`** - Dashboard for employees to view and manage tasks.
- **`/manager-dashboard`** - Dashboard for managers to assign and manage tasks, and view employee progress.
- **`/admin-dashboard`** - Dashboard for admins to manage employees and oversee task assignments.

### Environment Variables

The app requires environment-specific configurations, such as the port. Create a `.env` file in the root of the project if necessary, and include variables like:

PORT=4000

### Acknowledgments

- **React**: Frontend JavaScript library.
- **Axios**: For making HTTP requests.
- **React Router**: For navigation.
- **TypeScript**: Adds static typing to JavaScript.
- **Bootstrap**: For building responsive and styled components.
