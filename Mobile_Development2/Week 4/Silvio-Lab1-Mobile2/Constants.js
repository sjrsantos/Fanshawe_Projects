// Constants.js
import { Dimensions } from "react-native";

// add a console.log here to verify if the file is working:
// console.log("Constants.js is working");
export const Constants = {
  SCREEN_WIDTH: Dimensions.get("screen").width,
  SCREEN_HEIGHT: Dimensions.get("screen").height,
  WINDOW_WIDTH: Dimensions.get("window").width,
  WINDOW_HEIGHT: Dimensions.get("window").height,
};
