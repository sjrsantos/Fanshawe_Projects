import Box from "../components/Box";
import { Dimensions } from "react-native";

export default () => {
  const MAX_HEIGHT = Dimensions.get("screen").height;
  const MAX_WIDTH = Dimensions.get("screen").width;

  const xPos = MAX_WIDTH / 2;
  const yPos = MAX_HEIGHT / 2;
  return {
    Rectangle: Box("green", { x: xPos, y: yPos }, { width: 100, height: 100 }),
  };
};
