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
    <div>
      <h3>Title: {title}</h3>
      <p>Task ID: {id}</p>
      <p>Description: {description}</p>
      <p>Status: {status}</p>
      <button onClick={handleTaskStatusClick}>Change Status</button>
      <button onClick={removeTask}>Remove</button>
      <hr></hr>
    </div>
  );
}
