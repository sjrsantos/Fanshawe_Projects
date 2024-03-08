// root/components/CircleRB.js
import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const CircleRB = (props) => {
  const width = props.radius * 2;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - width / 2;

  return (
    <View
      style={{
        borderWidth: 2,
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: width,
        borderRadius: props.radius,
        backgroundColor: props.color,
      }}
    />
  );
};

export default (world, color, pos, radius, isStatic) => {
  const circleRB = Matter.Bodies.circle(pos.x, pos.y, radius, {
    isStatic: !!isStatic,
  });

  Matter.World.add(world, circleRB);
  return {
    body: circleRB,
    radius,
    color, // Include the color here
    renderer: <CircleRB body={circleRB} color={color} />, // Pass color prop to the renderer
  };
};
