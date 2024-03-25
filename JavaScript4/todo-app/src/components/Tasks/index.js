// src/components/Tasks/index.js
import Task from "./Task";
import "./styles.scss";
import { MdClearAll } from "react-icons/md";

export default function Tasks({
  tasks,
  setTasks,
  onTaskComplete,
  onTaskRemove,
  onClearTasks,
}) {
  return (
    <main className="task-list">
      <div className="task-list-title">This is your task list:</div>
      <div className="task-list-components">
        {tasks.map((task, id) => (
          <Task
            key={id}
            {...task}
            onTaskComplete={onTaskComplete}
            onTaskRemove={onTaskRemove}
          />
        ))}
      </div>
      <div className="task-list-footer">
        <button
          title="Clear Tasks"
          className="clear-tasks"
          onClick={onClearTasks}
        >
          <MdClearAll />
          Clear Tasks
        </button>
      </div>
    </main>
  );
}
