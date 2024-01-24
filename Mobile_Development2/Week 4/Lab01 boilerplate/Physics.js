import Matter, { Sleeping } from "matter-js";
import Constants from "./Constants";
const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      // Matter.Body.applyForce(
      //   entities.Square.body,
      //   entities.Square.body.position,
      //   { x: 0.05, y: 0.05 } //F = ma
      // );
      // Matter.Body.setVelocity(entities.Square.body, {
      //   x: 0,
      //   y: 3,
      // });
      //Matter.Body.scale(entities.Square.body, 1.5, 1.5);
      //Matter.Body.rotate(entities.Square.body, Math.PI / 3);
      //Matter.Body.setAngularVelocity(entities.Square.body, Math.PI / 8);
      //Sleeping.set(entities.Square.body, false);
    });
  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;

    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;
    if (objALabel === "Box" && objBLabel === "Boundary") {
      Matter.Body.setPosition(entities.Square.body, {
        x: Constants.WINDOW_WIDTH / 2,
        y: Constants.WINDOW_HEIGHT / 2,
      });
      //Sleeping.set(entities.Square.body, true);
    }
  });

  return entities;
};

export default Physics;
