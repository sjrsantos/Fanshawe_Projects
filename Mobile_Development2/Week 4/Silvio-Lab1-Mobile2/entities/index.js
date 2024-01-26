// entities/index.js
import Matter from "matter-js";
import { createBox } from "../components/Box";
import { createBoundary } from "../components/Boundary";
import { Constants } from "../Constants"; // Import Constants

const engine = Matter.Engine.create({ enableSleeping: false });
const { world } = engine;
const redMarginWidth = 20;

engine.gravity.y = 0.3;

const initializeEntities = () => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const { world } = engine;
  engine.gravity.y = 0.3;

  // Create red margin boundaries using createBoundary function
  const topRedBoundary = createBoundary(
    world,
    "red",
    { x: Constants.SCREEN_WIDTH / 2, y: 20 / 2 },
    { width: Constants.SCREEN_WIDTH, height: 20 }
  );

  const bottomRedBoundary = createBoundary(
    world,
    "red",
    {
      x: Constants.SCREEN_WIDTH / 2,
      y: Constants.SCREEN_HEIGHT - redMarginWidth * 1.5,
    },
    { width: Constants.SCREEN_WIDTH, height: redMarginWidth }
  );

  const leftRedBoundary = createBoundary(
    world,
    "red",
    { x: redMarginWidth / 2, y: Constants.SCREEN_HEIGHT / 2 },
    { width: redMarginWidth, height: Constants.SCREEN_HEIGHT }
  );

  const rightRedBoundary = createBoundary(
    world,
    "red",
    {
      x: Constants.SCREEN_WIDTH - redMarginWidth / 2,
      y: Constants.SCREEN_HEIGHT / 2,
    },
    { width: redMarginWidth, height: Constants.SCREEN_HEIGHT }
  );

  // Create box entities using createBox function
  const boxEntity = createBox(
    world,
    "green",
    { x: 100, y: 100 },
    { width: 50, height: 50 }
  );

  // Set the initial position of the red box to the center of the screen
  const playerEntity = createBox(
    world,
    "red",
    { x: Constants.SCREEN_WIDTH / 2, y: Constants.SCREEN_HEIGHT / 2 },
    { width: 20, height: 20 }
  );

  return {
    physics: { engine, world },
    box: { ...boxEntity, width: 50, height: 50 }, // Include width and height
    redBox: { ...playerEntity, width: 20, height: 20 }, // Include width and height
    topRedBoundary: topRedBoundary,
    bottomRedBoundary: bottomRedBoundary,
    leftRedBoundary: leftRedBoundary,
    rightRedBoundary: rightRedBoundary,
  };
};

export default initializeEntities;
