// index.js Purpose: index.js is a file that initializes the entities of the game. It creates the box, the boundary, and the player. It also creates the red margin boundaries.
import Matter from "matter-js";
import { createBox, Box } from "../components/Box";
import { createBoundary, Boundary } from "../components/Boundary";
import { Constants } from "../Constants"; // Import Constants

const engine = Matter.Engine.create({ enableSleeping: false });
const { world } = engine;

engine.gravity.y = 0.3;

const initializeEntities = () => {
  const boxWidth = 50;
  const boxHeight = 50;
  const boundaryWidth = 800;
  const boundaryHeight = 20;

  const boxX = 100;
  const boxY = 100;
  const boundaryX = 400;
  const boundaryY = 600;

  const redMarginWidth = 20; // Adjust this value as needed
  const redMarginColor = "red";

  // Create red margin boundaries
  const topRedBoundary = createBoundary(
    world,
    redMarginColor,
    { x: Constants.SCREEN_WIDTH / 2, y: redMarginWidth / 2 },
    { width: Constants.SCREEN_WIDTH, height: redMarginWidth }
  );
  const bottomRedBoundary = createBoundary(
    world,
    redMarginColor,
    {
      x: Constants.SCREEN_WIDTH / 2,
      y: Constants.SCREEN_HEIGHT - redMarginWidth * 1.5,
    },
    { width: Constants.SCREEN_WIDTH, height: redMarginWidth }
  );
  const leftRedBoundary = createBoundary(
    world,
    redMarginColor,
    { x: redMarginWidth / 2, y: Constants.SCREEN_HEIGHT / 2 },
    { width: redMarginWidth, height: Constants.SCREEN_HEIGHT }
  );
  const rightRedBoundary = createBoundary(
    world,
    redMarginColor,
    {
      x: Constants.SCREEN_WIDTH - redMarginWidth / 2,
      y: Constants.SCREEN_HEIGHT / 2,
    },
    { width: redMarginWidth, height: Constants.SCREEN_HEIGHT }
  );

  const boxEntity = createBox(
    world,
    "green",
    { x: boxX, y: boxY },
    { width: boxWidth, height: boxHeight }
  );

  // Create a movable player and add it to the world
  const playerEntity = createBox(
    world,
    "red", // Color of the player body
    { x: Constants.SCREEN_WIDTH / 2, y: Constants.SCREEN_HEIGHT / 2 }, // Center of the screen
    { width: 20, height: 20 } // Size of the player body
  );

  // console.log("Entities initialized");

  return {
    physics: { engine, world },
    box: boxEntity,
    player: playerEntity,
    redBox: playerEntity,
    topRedBoundary: topRedBoundary,
    bottomRedBoundary: bottomRedBoundary,
    leftRedBoundary: leftRedBoundary,
    rightRedBoundary: rightRedBoundary,
  };
};

export default initializeEntities;
