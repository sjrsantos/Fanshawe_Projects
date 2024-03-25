import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header/index.js";
import Tasks from "./components/Tasks/index";

import React, { useState } from "react";
import "./styles.scss";
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";

import HelpPage from "./pages/HelpPage/index";
import IntroductionPage from "./pages/HelpPage/Introduction";
import AddingTasksPage from "./pages/HelpPage/AddingTasks";
import RemovingTasksPage from "./pages/HelpPage/RemovingTasks";
import ChangingStatusPage from "./pages/HelpPage/ChangingTasks";

import * as database from "./database/index.js";

function App() {
  const [tasks, setTasks] = useState([]);

  database.load().then((data) => {
    setTasks(data);
  });

  function changeStatus(id) {
    database.update(id, {
      status:
        tasks.find((task) => task.id === id).status === "Open"
          ? "Completed"
          : "Open",
    });
  }

  function removeTask(id) {
    database.remove(id);
  }

  function addTask(title, description, status) {
    const newTask = {
      title,
      description,
      status,
    };

    database.save(newTask);
  }

  function clearTasks() {
    tasks.forEach((task) => database.remove(task.id));
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
