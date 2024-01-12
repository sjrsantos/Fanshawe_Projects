import React from "react";

export default class CounterClass extends React.Component {
  render() {
    const { name, age } = this.props;

    const handleClickEvent = function () {
      console.log("Function Expression clicked by ", name);
    };

    const handleAnotherClickEvent = () => {
      console.log("Arrow Expression clicked by ", name);
    };

    return (
      <div>
        Class: {name}, {age}
        <button onClick={handleClickEvent}>Click Me</button>
        <button onClick={handleAnotherClickEvent}>Click Here</button>
        <button onClick={this.handleOneMoreClickEvent}>One More</button>
      </div>
    );
  }
}

handleOneMoreClickEvent = () => {
  console.log("One More clicked by ", this.props.name);
};

// the name of the file was CounterClass.js; however, to demonstrate that the default file is index.js, I changed the name
// of the file to index.js and changed the import statement in App.js to import CounterClass from "./components/CounterClass/index.js";
