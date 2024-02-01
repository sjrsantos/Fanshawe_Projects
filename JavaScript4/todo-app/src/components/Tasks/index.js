import Task from "./Task";

export default function Tasks({
  tasks,
  setTasks,
  onTaskComplete,
  onTaskRemove,
  onClearTasks,
}) {
  return (
    <div>
      <h2>This is your task list:</h2>
      <hr></hr>
      {tasks.map((task, id) => (
        <Task
          key={id}
          {...task}
          onTaskComplete={onTaskComplete}
          onTaskRemove={onTaskRemove}
        />
      ))}

      <button onClick={onClearTasks}>Clear Tasks</button>
    </div>
  );
}
