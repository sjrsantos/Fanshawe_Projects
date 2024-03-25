// src/components/Form/index.js
import React, { useState } from "react";
import "./style.scss";
import { MdOutlineAddTask } from "react-icons/md";

export default function Form({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]); // The title must be at least 5 characters long
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNewTask = (event) => {
    event.preventDefault();

    // Hide the success message
    setShowSuccessMessage(false);

    // Validate the data
    const validate = [];
    if (title.length < 5) {
      validate.push("The title must be at least 5 characters long");
    }
    if (description === "") {
      validate.push("The description is required");
    }
    if (status === false) {
      validate.push("The status is required");
    }

    setErrorMessages(validate);

    if (validate.length === 0) {
      // Valid data
      onAddTask(title, description, status);

      // Display success message
      setShowSuccessMessage(true);

      // Clear the form
      setTitle("");
      setDescription("");
      setStatus("Open");
    }
  };

  const statuses = [
    {
      id: "Open",
      text: "Open",
    },
    {
      id: "Completed",
      text: "Completed",
    },
  ];

  return (
    <form className="form-component" onSubmit={handleNewTask}>
      {/* Conditionally display the success message */}
      {showSuccessMessage && (
        <div className="success-message">
          <p>Task added successfully!</p>
        </div>
      )}

      {/* Conditionally display the error messages */}
      {errorMessages.length > 0 && (
        <div className="form-validate">
          <h3>Errors:</h3>
          <ul>
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <h2>Add a New Task</h2>

      {/* Title Field */}
      <div>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={20}
            placeholder="Enter a title"
          />
        </label>
      </div>

      {/* Description Field */}
      <div>
        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={100}
            placeholder="Enter a description"
          />
        </label>
      </div>

      {/* Status Field */}
      <div className="status-field">
        <label>
          Status:
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value={""}>-- Select a Status --</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.text}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Add Task Button */}
      <div>
        <button type="submit" title="Add Task" className="add-task">
          <MdOutlineAddTask /> <div>Add Task</div>
        </button>
      </div>
    </form>
  );
}
