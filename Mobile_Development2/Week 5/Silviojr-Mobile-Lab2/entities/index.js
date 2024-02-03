// entities/index.js
import Box from "../components/Box";
import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";

import Constants from "../Constants";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0;

  return {
    physics: { engine, world },
    //Enemy
    Square: Box(
      world,
      "green",
      { x: 120, y: 120 },
      { width: 40, height: 40 },
      { isStatic: false, label: "Enemy" }
    ),
    //Player
    RedSquare: Box(
      world,
      "blue",
      { x: screenWidth / 2, y: 190 },
      { width: 20, height: 20 },
      { isStatic: false, label: "Player" }
    ),

    //Boundary
    BoundaryTop: Boundary(
      world,
      "red",
      { x: screenWidth / 2, y: 0 },
      { height: 30, width: screenWidth }
    ),

    BoundaryLeft: Boundary(
      world,
      "red",
      { x: 0, y: screenHeight / 2 },
      { height: screenHeight, width: 30 }
    ),

    BoundaryRight: Boundary(
      world,
      "red",
      { x: screenWidth, y: screenHeight / 2 },
      { height: screenHeight, width: 30 }
    ),

    BoundaryCenter: Boundary(
      world,
      "red",
      { x: screenWidth / 2, y: screenWidth },
      { height: 20, width: screenWidth }
    ),

    BoundaryBottom: Boundary(
      world,
      "red",
      { x: screenWidth / 2, y: screenHeight },
      { height: 30, width: screenWidth }
    ),
  };
};
