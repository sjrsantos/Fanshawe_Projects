import React from "react";

export default class CounterClass extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      lastAction: "none",
    };
  }

  render() {
    const handleIncrementClick = () => {
      this.setState({
        counter: this.state.counter + 1,
        lastAction: "increased",
      });
    };

    const handleDecreaseClick = () => {
      this.setState({
        counter: this.state.counter - 1,
        lastAction: "decreased",
      });
    };

    return (
      <div>
        Counter: {this.state.counter}
        <div>Last Action: {this.state.lastAction}</div>
        <button onClick={handleIncrementClick}>Increase</button>
        <button onClick={handleDecreaseClick}>Decrease</button>
        {/* <button
          onClick={() => this.setState({ counter: this.state.counter - 1 })}
        >
          Decrease
        </button> 
        this method works too, but it's not as clean as the method above 
        */}
      </div>
    );
  }
}

// the name of the file was CounterClass.js; however, to demonstrate that the default file is index.js, I changed the name
// of the file to index.js and changed the import statement in App.js to import CounterClass from "./components/CounterClass/index.js";
