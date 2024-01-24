import Box from "../components/Box";
import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Red from "../components/Red";
import Constants from "../Constants";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.3;

  return {
    physics: { engine, world },
    Square: Box(world, "green", { x: 100, y: 120 }, { width: 40, height: 40 }),

    BottomBoundary: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 90, width: Constants.WINDOW_WIDTH }
    ),
  };
};
