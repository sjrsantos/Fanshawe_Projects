// root/physics.js
import Matter, { Sleeping } from "matter-js";

const Physics = (entities, { touches, dispatch, events, time }) => {
  let engine = entities.physics.engine;

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
    //Sleeping.set(entities.RedSquare.body, false);
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-up") {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 0, y: -2 });
      }
      if (events[i].type === "move-down") {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 0, y: 2 });
      }
    }
  }

  /*************TOUCH CONTROLS DRAGGING IN THE SCREEN ****************/

  let x = entities.Square.body.position.x;
  let y = entities.Square.body.position.y;
  touches
    .filter((t) => t.type === "move")
    .forEach((t) => {
      x += t.delta.pageX;
      y += t.delta.pageY;
      Matter.Body.setPosition(entities.Square.body, {
        x: x,
        y: y,
      });
    });

  /*************TOUCH CONTROLS WITH SCREEN TAP ****************/

  // touches
  //   .filter((t) => t.type === "press")
  //   .forEach((t) => {
  //     Matter.Body.applyForce(
  //       entities.Square.body,
  //       entities.Square.body.position,
  //       {
  //         x: 0,
  //         y: 0.05,
  //       }
  //     );

  //     Sleeping.set(entities.Square.body, false);
  //   });

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objA = pairs[0].bodyA;
    var objB = pairs[0].bodyB;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;
    //code here
  });
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
