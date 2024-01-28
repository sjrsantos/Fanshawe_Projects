// entities/index.js
import Matter from "matter-js";
import Box from "../components/Box";
import Boundary from "../components/Boundary";
import { Constants } from "../Constants";

const boxSize = 50;
const boundaryThickness = 30;

export const setupWorld = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  // Create the player (green box)
  const player = Matter.Bodies.rectangle(
    boxSize / 2 + 20, // x position
    boxSize / 2 + 20, // y position
    boxSize,
    boxSize,
    {
      label: "player",
      restitution: 0, // Prevents bouncing
      inertia: Infinity, // Prevents rotation
      frictionAir: 0, // Optional: reduces air resistance
      friction: 0, // Optional: reduces surface friction
    }
  );

  // Create the static red box at the center of the screen
  const staticBox = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT / 2,
    boxSize / 2,
    boxSize / 2,
    { isStatic: true, label: "static" }
  );

  // Create boundaries
  const floor = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - boundaryThickness / 2,
    Constants.MAX_WIDTH,
    boundaryThickness,
    { isStatic: true, label: "floor" }
  );
  const ceiling = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    boundaryThickness / 2,
    Constants.MAX_WIDTH,
    boundaryThickness,
    { isStatic: true, label: "ceiling" }
  );
  const leftWall = Matter.Bodies.rectangle(
    boundaryThickness / 2,
    Constants.MAX_HEIGHT / 2,
    boundaryThickness,
    Constants.MAX_HEIGHT,
    { isStatic: true, label: "leftWall" }
  );
  const rightWall = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH - boundaryThickness / 2,
    Constants.MAX_HEIGHT / 2,
    boundaryThickness,
    Constants.MAX_HEIGHT,
    { isStatic: true, label: "rightWall" }
  );

  // Add all the bodies to the world
  Matter.World.add(world, [
    player,
    staticBox,
    floor,
    ceiling,
    leftWall,
    rightWall,
  ]);

  return {
    physics: { engine, world },
    player: {
      body: player,
      size: [boxSize, boxSize],
      color: "green",
      renderer: Box,
    },
    staticBox: {
      body: staticBox,
      size: [boxSize / 2, boxSize / 2],
      color: "red",
      renderer: Box,
    },
    floor: {
      body: floor,
      size: [Constants.MAX_WIDTH, boundaryThickness],
      color: "red",
      renderer: Boundary,
    },
    ceiling: {
      body: ceiling,
      size: [Constants.MAX_WIDTH, boundaryThickness],
      color: "red",
      renderer: Boundary,
    },
    leftWall: {
      body: leftWall,
      size: [boundaryThickness, Constants.MAX_HEIGHT],
      color: "red",
      renderer: Boundary,
    },
    rightWall: {
      body: rightWall,
      size: [boundaryThickness, Constants.MAX_HEIGHT],
      color: "red",
      renderer: Boundary,
    },
  };
};
