import Task from "./Task";
import { useState } from "react";
import uuid from "react-uuid";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      title: "Walk the dog",
    },
    {
      id: uuid(),
      title: "Wash the car",
    },
    {
      id: uuid(),
      title: "Finish the lab",
    },
  ]);

  function changeStatus(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addTask(title, status) {
    const newTask = {
      id: uuid(),
      title,
      status,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <div>
      <h2>This is your task list:</h2>
      <hr></hr>
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onTaskComplete={changeStatus}
          onTaskRemove={removeTask}
        />
      ))}

      <button onClick={() => addTask("Default Title", "Default Status")}>
        Add Task
      </button>

      <button onClick={clearTasks}>Clear Tasks</button>
    </div>
  );
}
