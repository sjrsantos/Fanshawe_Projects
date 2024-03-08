// root/entities/index.js
import Matter from "matter-js";
import CircleRB from "../components/CircleRB";
import RectangleRB from "../components/RectangleRB";
import { Dimensions } from "react-native";

export default (gameWorld) => {
  let engine = Matter.Engine.create();
  let world = engine.world;

  // Set gravity
  Matter.World.gravity = { x: 0, y: 0.5 };

  // Create RectangleRB
  const rectangleRB = RectangleRB(
    world,
    "red",
    {
      x: Dimensions.get("window").width / 2,
      y: 50, // Position at the top of the screen
    },
    { width: 100, height: 50 }
  );

  // Create CircleRB instances
  const circleRBs = [];
  const numCircles = 10;
  const circleSpacing = Dimensions.get("window").width / (numCircles + 1);
  for (let i = 0; i < numCircles; i++) {
    const isStatic = i === 0 || i === numCircles - 1; // First and last CircleRB are static
    const circleX = (i + 1) * circleSpacing;
    const circleY = Dimensions.get("window").height - 300;

    const circleRB = CircleRB(
      world,
      { x: circleX, y: circleY }, // Pass position object instead of just coordinates
      20,
      isStatic
    );
    circleRBs.push(circleRB);
  }

  // Add CircleRB instances to the entities
  // Create constraints between adjacent circles to form a chain
  const constraints = [];
  for (let i = 0; i < numCircles - 1; i++) {
    const constraint = Matter.Constraint.create({
      bodyA: circleRBs[i].body,
      bodyB: circleRBs[i + 1].body,
      length: circleSpacing, // Adjust the length based on your requirements
      stiffness: 0.1, // Adjust stiffness as needed
    });
    constraints.push(constraint);
  }
  Matter.World.add(world, constraints);

  return {
    physics: { engine, world },
    RectangleRB: rectangleRB,
    CircleRBs: circleRBs,
  };
};
