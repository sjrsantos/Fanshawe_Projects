import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Boundary = (props) => {
  const width = props.size.width || 0;
  const height = props.size.height || 0;

  const xPos = props.position.x - width / 2;
  const yPos = props.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: props.color,
      }}
    />
  );
};

export default (world, color, position, size) => {
  const boundary = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Boundary",
      isStatic: true,
    }
  );
  Matter.World.add(world, boundary);
  return {
    body: boundary,
    color,
    position,
    renderer: <Boundary size={size} color={color} position={position} />,
  };
};
