// root/entities/index.js
import Matter from "matter-js";
import CircleRB from "../components/CircleRB";
import RectangleRB from "../components/RectangleRB";
import { Dimensions } from "react-native";

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  // Set gravity
  engine.world.gravity.y = 0.5;

  // Create a single RectangleRB
  const rectangleRB = RectangleRB(
    world,
    "red",
    { x: Dimensions.get("window").width / 2, y: 50 },
    { width: 50, height: 50 }
  );

  // Create multiple CircleRB instances
  const circleRBs = [];
  const numCircles = 10;
  const circleSpacing = Dimensions.get("window").width / (numCircles + 1);
  for (let i = 0; i < numCircles; i++) {
    const isStatic = i === 0 || i === numCircles - 1; // Make the first and last circles static
    const circleX = (i + 1) * circleSpacing;
    const circleY = Dimensions.get("window").height - 300;

    let circleRB = CircleRB(
      world,
      "blue",
      { x: circleX, y: circleY },
      20,
      isStatic
    );
    circleRBs.push(circleRB);
  }

  // Create constraints (links) between adjacent circles to form a bridge
  for (let i = 0; i < numCircles - 1; i++) {
    Matter.World.add(
      world,
      Matter.Constraint.create({
        bodyA: circleRBs[i].body,
        bodyB: circleRBs[i + 1].body,
        length: circleSpacing, // Adjust length to ensure circles are closer together
        stiffness: 0.4, // Adjust stiffness to make the bridge more rigid
      })
    );
  }

  // Convert the circleRBs array into an object with unique keys for GameEngine
  const circleEntities = circleRBs.reduce((acc, circle, index) => {
    acc[`CircleRB_${index}`] = circle; // Use a unique key for each circle
    return acc;
  }, {});

  // Add RectangleRB, and all circle entities to the game world
  return {
    physics: { engine, world },
    RectangleRB: rectangleRB,
    ...circleEntities, // Spread the circle entities into the final object
  };
};
