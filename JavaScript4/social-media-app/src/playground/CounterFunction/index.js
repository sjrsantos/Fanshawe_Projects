import { useState } from "react";

export default function CounterFunction() {
  const [counter, setCounter] = useState(3);
  const [lastAction, setLastAction] = useState("none");

  const handleIncrementClick = () => {
    setCounter(counter + 1);
    setLastAction("increased");
  };

  const handleDecreaseClick = () => {
    setCounter(counter - 1);
    setLastAction("decreased");
  };

  return (
    <div>
      Counter: {counter}
      <div>Last Action: {lastAction}</div>
      <button onClick={handleIncrementClick}>Increase</button>
      <button onClick={handleDecreaseClick}>Decrease</button>
    </div>
  );
}
