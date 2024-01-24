import Box from '../components/Box';
import { Dimensions } from 'react-native';
import Matter from 'matter-js';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  
  return {
    physics: { engine, world },
    Square: Box(world, 'green', { x: 150, y: 120 }, { width: 80, height: 40 }),

  };
};
