// src/components/Tasks/Task/index.js
import "./styles.scss";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { TbStatusChange } from "react-icons/tb";

export default function Task({
  id,
  title,
  description,
  status,
  onTaskComplete,
  onTaskRemove,
}) {
  const handleTaskStatusClick = () => {
    onTaskComplete(id);
  };

  const removeTask = () => {
    onTaskRemove(id);
  };

  return (
    <div className="task-item">
      <div className="info">
        <div className="task-title">Title: {title}</div>

        <div className="task-description">Description: {description}</div>
        <div className="task-status">Status: {status}</div>
        <div className="task-id">Task ID: {id}</div>
      </div>

      <div className="status">
        <button
          title="Change Status"
          className="change-status"
          onClick={handleTaskStatusClick}
        >
          <TbStatusChange />
          Change Status
        </button>
        <button
          title="Remove Task"
          className="remove-task"
          onClick={removeTask}
        >
          <MdOutlinePlaylistRemove />
          Remove Task
        </button>
      </div>
    </div>
  );
}
