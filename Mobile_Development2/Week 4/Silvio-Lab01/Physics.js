import Matter from "matter-js";
// import Constants from "./Constants";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let player = entities.Player.body;

  // Update player movement based on boundary collisions
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;

    pairs.forEach((pair) => {
      if (pair.bodyA === player || pair.bodyB === player) {
        let otherBody = pair.bodyA === player ? pair.bodyB : pair.bodyA;

        // Check which boundary was hit and update velocity accordingly
        if (otherBody.label === "BottomBoundary") {
          Matter.Body.setVelocity(player, { x: 1, y: 0 }); // Move right
        } else if (otherBody.label === "RightBoundary") {
          Matter.Body.setVelocity(player, { x: 0, y: -1 }); // Move up
        } else if (otherBody.label === "TopBoundary") {
          Matter.Body.setVelocity(player, { x: -1, y: 0 }); // Move left
        } else if (otherBody.label === "LeftBoundary") {
          Matter.Body.setVelocity(player, { x: 0, y: 1 }); // Move down
        }
      }
    });
  });

  // Initial movement of the player
  if (!entities.Player.moved) {
    Matter.Body.setVelocity(player, { x: 0, y: 1 }); // Initial movement downwards
    entities.Player.moved = true;
  }

  // Regular physics engine update
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
