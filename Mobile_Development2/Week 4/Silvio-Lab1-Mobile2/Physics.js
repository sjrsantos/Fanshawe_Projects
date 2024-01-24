// Purpose: Physics.js is a file that handles the physics of the game. It handles the collisions between the ball and the walls, and the ball and the paddle. It also handles the movement of the paddle.
import Matter from "matter-js";
import { Constants } from "./Constants"; // Import Constants as named import

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;

  // Handle player movement based on touches
  touches.forEach((touch) => {
    // In Physics.js, add the following code inside the forEach loop for touches
    if (touch.type === "move") {
      // Calculate the direction of the touch movement
      const dx = touch.delta.pageX;
      const dy = touch.delta.pageY;

      // Apply an impulse to the green box's body
      Matter.Body.applyForce(entities.box.body, entities.box.body.position, {
        x: dx * 0.05, // Adjust the multiplier as needed for the desired speed
        y: dy * 0.05,
      });
    }
  });

  // Update the engine with the time delta
  Matter.Engine.update(engine, time.delta);

  const handleCollision = (entities) => {
    let player = entities.player.body;
    let bottomBoundary = entities.bottomRedBoundary.body;
    let topBoundary = entities.topRedBoundary.body;
    let leftBoundary = entities.leftRedBoundary.body;
    let rightBoundary = entities.rightRedBoundary.body;

    Matter.Events.on(entities.physics.engine, "collisionStart", (event) => {
      let pairs = event.pairs;

      pairs.forEach((pair) => {
        if (pair.bodyA === player || pair.bodyB === player) {
          // Collides with bottom boundary, move right
          if (pair.bodyA === bottomBoundary || pair.bodyB === bottomBoundary) {
            Matter.Body.setVelocity(player, { x: 10, y: 0 });
          }
          // Collides with right boundary, move up
          if (pair.bodyA === rightBoundary || pair.bodyB === rightBoundary) {
            Matter.Body.setVelocity(player, { x: 0, y: -10 });
          }
          // Collides with top boundary, move left
          if (pair.bodyA === topBoundary || pair.bodyB === topBoundary) {
            Matter.Body.setVelocity(player, { x: -10, y: 0 });
          }
          // Collides with left boundary, move down
          if (pair.bodyA === leftBoundary || pair.bodyB === leftBoundary) {
            Matter.Body.setVelocity(player, { x: 0, y: 10 });
          }
        }
      });
    });
  };

  // add a console.log here to verify if the file is working:
  // console.log("Physics.js is working");

  // Return all entities
  return entities;
};

export default Physics;
