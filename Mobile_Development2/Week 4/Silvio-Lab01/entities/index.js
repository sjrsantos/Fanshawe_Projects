import Box from "../components/Box";
import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
// import Red from "../components/Red";
// import Constants from "../Constants";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.3;

  const WINDOW_WIDTH = Dimensions.get("window").width;
  const WINDOW_HEIGHT = Dimensions.get("window").height;

  return {
    physics: { engine, world },
    Square: Box(world, "green", { x: 100, y: 120 }, { width: 40, height: 40 }),

    BottomBoundary: Boundary(
      world,
      "red",
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT },
      { height: 90, width: WINDOW_WIDTH }
    ),

    // Boundaries
    TopBoundary: Boundary(
      world,
      "grey",
      { x: WINDOW_WIDTH / 2, y: 0 },
      { width: WINDOW_WIDTH, height: 20 }
    ),
    BottomBoundary: Boundary(
      world,
      "grey",
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT },
      { width: WINDOW_WIDTH, height: 20 }
    ),
    LeftBoundary: Boundary(
      world,
      "grey",
      { x: 0, y: WINDOW_HEIGHT / 2 },
      { width: 20, height: WINDOW_HEIGHT }
    ),
    RightBoundary: Boundary(
      world,
      "grey",
      { x: WINDOW_WIDTH, y: WINDOW_HEIGHT / 2 },
      { width: 20, height: WINDOW_HEIGHT }
    ),

    // Central Square
    CentralSquare: Box(
      world,
      "blue",
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT / 2 },
      { width: 100, height: 100 }
    ),

    // Player
    Player: Box(
      world,
      "green",
      { x: 50, y: 50 },
      { width: 30, height: 30 },
      true
    ), // Set the last parameter to true for a dynamic body
  };
};
