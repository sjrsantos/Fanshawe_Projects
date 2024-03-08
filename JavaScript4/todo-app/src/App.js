import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header/index.js";
import Tasks from "./components/Tasks/index";
import uuid from "react-uuid";
import React, { useState } from "react";
import "./styles.scss";
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";

import HelpPage from "./pages/HelpPage/index";
import IntroductionPage from "./pages/HelpPage/Introduction";
import AddingTasksPage from "./pages/HelpPage/AddingTasks";
import RemovingTasksPage from "./pages/HelpPage/RemovingTasks";
import ChangingStatusPage from "./pages/HelpPage/ChangingTasks";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      title: "Walk the dog",
      description: "Take the dog for a walk around the block",
      status: "Open",
    },
    {
      id: uuid(),
      title: "Wash the car",
      description: "Wash the car in the driveway",
      status: "Open",
    },
    {
      id: uuid(),
      title: "Finish the lab",
      description: "Finish the lab for JavaScript 4",
      status: "Open",
    },
  ]);
  function changeStatus(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Open" ? "Completed" : "Open" }
          : task
      )
    );
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addTask(title, description, status) {
    const newTask = {
      id: uuid(),
      title,
      description,
      status,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Tasks
                tasks={tasks}
                onTaskComplete={changeStatus}
                onTaskRemove={removeTask}
                onClearTasks={clearTasks}
              />
            }
          />

          <Route path="/add" element={<Form onAddTask={addTask} />} />

          <Route path="/help" element={<HelpPage />}>
            <Route path="" element={<IntroductionPage />} />
            <Route path="adding-tasks" element={<AddingTasksPage />} />
            <Route path="removing-tasks" element={<RemovingTasksPage />} />
            <Route path="changing-status" element={<ChangingStatusPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
