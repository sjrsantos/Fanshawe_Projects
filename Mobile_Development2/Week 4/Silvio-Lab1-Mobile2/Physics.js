// Physics.js (optimized)
import Matter from "matter-js";

const handleCollision = (entities) => {
  let player = entities.player.body; // Change to entities.player.body
  let bottomBoundary = entities.bottomRedBoundary.body;
  let topBoundary = entities.topRedBoundary.body;
  let leftBoundary = entities.leftRedBoundary.body;
  let rightBoundary = entities.rightRedBoundary.body;

  Matter.Events.on(entities.physics.engine, "collisionStart", (event) => {
    let pairs = event.pairs;

    pairs.forEach((pair) => {
      if (pair.bodyA === player || pair.bodyB === player) {
        console.log("Collision detected:", pair);
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

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;

  touches.forEach((touch) => {
    if (touch.type === "move") {
      const dx = touch.delta.pageX;
      const dy = touch.delta.pageY;

      Matter.Body.applyForce(
        entities.player.body,
        entities.player.body.position,
        {
          x: dx * 0.05,
          y: dy * 0.05,
        }
      );
    }
  });

  Matter.Engine.update(engine, time.delta);

  handleCollision(entities);

  return entities;
};

export default Physics;
