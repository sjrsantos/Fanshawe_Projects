// root/components/RectangleRB.js
import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const RectangleRB = (props) => {
  const { width, height } = props.size;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        borderWidth: 2,
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: props.color,
      }}
    />
  );
};

export default (world, color, pos, size) => {
  const rectangleRB = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height
  );
  Matter.World.add(world, rectangleRB);
  return { body: rectangleRB, color, size, renderer: <RectangleRB /> };
};
