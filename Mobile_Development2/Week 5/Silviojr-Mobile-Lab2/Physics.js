// root/Physics.js
import Matter, { Sleeping } from "matter-js";

const Physics = (entities, { touches, dispatch, events, time }) => {
  const generateRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const random = Math.random(); //Random Number
      const bit = (random * 16) | 0; //Floor
      color += bit.toString(16); //Random Color
    }
    return color;
  };

  let engine = entities.physics.engine;

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-up") {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 0, y: -3 }); // Player
      }
      if (events[i].type === "move-down") {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 0, y: 3 }); // Player
      }
      if (events[i].type === "move-left") {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: -3, y: 0 }); // Player
      }
      if (events[i].type === "move-right") {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 3, y: 0 }); // Player
      }
    }
  }

  /*************TOUCH CONTROLS DRAGGING IN THE SCREEN ****************/
  let x = entities.Square.body.position.x; //Enemy
  let y = entities.Square.body.position.y; //Enemy
  touches
    .filter((t) => t.type === "move")
    .forEach((t) => {
      x += t.delta.pageX;
      y += t.delta.pageY;
      Matter.Body.setPosition(entities.Square.body, {
        x: x,
        y: y,
      }); //Enemy
    });

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    //Color Change after Colision between Player and Boundary
    if (
      (objALabel === "Boundary" && objBLabel === "Player") ||
      (objALabel === "Player" && objBLabel === "Boundary")
    ) {
      let randomColor = generateRandomColor(); //Random Color
      entities.RedSquare.color = randomColor; //Player
    }
    //Stop Player after hit Boundary
    Sleeping.set(entities.RedSquare.body, true); //Player

    //Enemy Randomly Relocate
    if (
      (objALabel === "Enemy" && objBLabel === "Player") ||
      (objALabel === "Player" && objBLabel === "Enemy")
    ) {
      Matter.Body.setPosition(entities.Square.body, {
        x: Math.floor(Math.random() * (300 - 0 + 1)) + 40, //Random Position
        y: Math.floor(Math.random() * (300 - 0 + 1)) + 40, //Random Position
      });
      Sleeping.set(entities.RedSquare.body, true); //Player
    }
    //Continue Playing after Player stopped
    Sleeping.set(entities.RedSquare.body, false); //Player
  });
  Matter.Engine.update(engine, time.delta); //Update the Engine

  return entities;
};

export default Physics;
