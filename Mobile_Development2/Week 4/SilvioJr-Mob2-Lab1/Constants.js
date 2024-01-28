import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
};
