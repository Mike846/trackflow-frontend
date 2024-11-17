import React from "react";
import { Task } from "../models/Task";
import '../App.css'

// Define the type for TaskListProps, which expects an array of tasks
interface TaskListProps {
  tasks: Task[];
}

// TaskList component that displays a list of tasks
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li key={task._id} className="list-group-item">
          <h5>{task.title}</h5>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
