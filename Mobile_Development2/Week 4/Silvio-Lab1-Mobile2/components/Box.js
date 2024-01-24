//Box.js
import React from "react";
import { View } from "react-native";
import Matter from "matter-js";

const Box = (props) => {
  if (!props.body) return null;

  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

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

export const createBox = (world, color, pos, size) => {
  const box = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Box",
    frictionAir: 0,
    friction: 0,
  });

  Matter.World.add(world, box);

  // add a console.log here to verify if the file is working:
  // console.log("Box.js is working");
  return {
    body: box,
    color: color,
    pos: pos,
  };
};

export { Box };
