import { Dimensions, View } from "react-native";
import Matter from "matter-js";

const Box = (props) => {
  return (
    <View
      style={{
        width: props.size.width,
        height: props.size.height,
        left: props.pos.x,
        top: props.pos.y,
        backgroundColor: props.color,
      }}
    ></View>
  );
};

export default (color, pos, size) => {
  const theBox = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height);
  return { body: theBox, color, pos, size, renderer: <Box /> };
};
