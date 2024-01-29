// This file defines the physics world used in the game. It also defines functions
// to create and update the physics world.

// Physics.js
import Matter from "matter-js";
import { Constants } from "./Constants";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  let player = entities.player.body;

  engine.world.gravity.y = 0; //no gravity - no fall
  engine.world.friction = 0; //no friction
  engine.world.frictionAir = 0; //no friction

  // Apply initial downward velocity on touch
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(player, { x: 0, y: 5 });
    });

  // Add an event listener for collisions (outside the touch event handler)
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;

    pairs.forEach((pair) => {
      if (pair.bodyA === player || pair.bodyB === player) {
        let otherBody = pair.bodyA === player ? pair.bodyB : pair.bodyA;

        switch (otherBody.label) {
          case "floor":
            Matter.Body.setVelocity(player, { x: 5, y: 0 }); // Move right
            break;
          case "rightWall":
            Matter.Body.setVelocity(player, { x: 0, y: -5 }); // Move up
            break;
          case "ceiling":
            Matter.Body.setVelocity(player, { x: -5, y: 0 }); // Move left
            break;
          case "leftWall":
            Matter.Body.setVelocity(player, { x: 0, y: 0 }); // Stop
            break;
        }
      }
    });
  });

  return entities;
};

export default Physics;
