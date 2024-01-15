import { Dimensions, View } from "react-native";
import Matter from "matter-js";

const Red = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        width: width,
        height: height,
        left: xPos,
        top: yPos,
        backgroundColor: props.color,
      }}
    ></View>
  );
};

export default (world, color, pos, size) => {
  const redBox = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Red", isStatic: true }
  );

  Matter.World.add(world, redBox);
  return { body: redBox, color, pos, size, renderer: <Red /> };
};
