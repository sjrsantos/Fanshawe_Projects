import Matter, { Sleeping } from 'matter-js';

const Physics = (entities, { touches, time }) => {
  
  let engine = entities.physics.engine;
  
  // engine.world.gravity.x = 0.01; //to move horizontally
  // engine.world.gravity.y = 0.01; //to move vertically 
  
  engine.world.gravity.y = 0; //no gravity - no fall 
  
  touches
    .filter((t) => t.type === 'press')
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Square.body, {
        x: 12, //move along x-axis with given velocity
        y: 10, //move along y-axis with given velocity
      });
  });
 
 Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
