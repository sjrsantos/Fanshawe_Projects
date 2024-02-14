import Matter from "matter-js";
import React from "react";
import { View, Image, Text } from "react-native";

const Ball = (props) => {
  const xBody = props.body.position.x - 70 / 2; //init x postion of a ball before the game starts
  const yBody = props.body.position.y - 150 / 2; //init y postion of a ball before the game starts

  //const color = props.color;

  return (
    <View
      style={{
        //borderWidth: 1,
        //borderColor: 'black',
        //backgroundColor: color,
        //position: 'absolute',
        left: xBody,
        top: yBody,
        // borderRadius: 44 / 2,
        width: 4,
        height: 4,
        //backgroundSize: 'auto',
      }}
    >
      <Image
        style={{
          resizeMode: "cover",
          height: 95,
          width: 95,
        }}
        source={require("../assets/bouncing_ball.png")}
      />
    </View>
  );
};

export default (world, pos, size) => {
  const ball = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    //size.borderRadius,
    { label: "Ball" }
  );
  Matter.World.add(world, ball);

  return {
    body: ball,
    //color,
    pos,
    renderer: <Ball />,
  };
};
