import {View} from 'react-native';
import Matter from 'matter-js';
import React, { useState } from 'react';

const Box = (props) => {
//const [isVisible, setElementVisible] = useState(true);

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
        position: 'absolute',
        //display: isVisible, 
      }}
    ></View>
  );
};

export default (world, color, pos, size) => {
  const theBox = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Box', frictionAir: 0, friction: 0 }
  );
  Matter.World.add(world, theBox);
  return { body: theBox, color, pos, renderer: <Box /> };
};
