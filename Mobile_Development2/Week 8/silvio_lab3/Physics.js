//root/Physics.js
import Matter from "matter-js";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.world.gravity.y = 0.5; // Set gravity

  // Update physics engine
  Matter.Engine.update(engine, time.delta);

  // Handle touches
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      // Place the rectangle rigid body randomly at the top half of the screen
      let rectangle = entities.RectangleRB.body;
      Matter.Body.setPosition(rectangle, {
        x: Math.random() * (400 - 100) + 100, // Random position within the top half of the screen
        y: Math.random() * (400 - 50) + 50,
      });
    });

  return entities;
};

export default Physics;
