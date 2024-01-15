import Matter, { Sleeping } from 'matter-js';
//import React, { useState } from 'react';


const Physics = (entities, { touches, time }) => {
  
 // const [elementVisible, setElementVisible] = useState(true);

  let engine = entities.physics.engine;
  
  // engine.world.gravity.x = 0; //to move horizontally
  // engine.world.gravity.y = 0.1; //to move vertically 
  
 engine.world.gravity.y = 0.2; //no gravity - no fall 
  
  
  // touches
  //   .filter((t) => t.type === 'press')
  //   .forEach((t) => {
  //     Matter.Body.setVelocity(entities.Square.body, {
  //       x: 0, //move along x-axis with given velocity
  //       y: 10, //move along y-axis with given velocity
  //     });

// click and box disappers 

//  touches
//     .filter((t) => t.type === 'press')
//     .forEach((t) => {
//       Matter.Body.setPosition(entities.Square.body,{
//       x:-100,
//       y:-100,
//       });

//  touches
//     .filter((t) => t.type === 'press')
//     .forEach((t) =>  {
//       Matter.Body.setElementVisible(false)
//     });

// touches
//     .filter((t) => t.type === 'press')
//     .forEach((t) =>  {
//       Matter.Composite.remove(entities.Square.body)
//     });



//entities.Square.visibility = 'none';

// setTimeout(() => {
//         Matter.Composite.remove(engine.world, entities.Square.body);
//         entities.Square.visibility = 'none';
//       }, 3000);


        // Matter.Body.rotate(entities.Square.body, 90);
      
        //Matter.Body.scale(entities.Square.body, 1.5, 1.5);
        
        //Matter.Body.translate(entities.Square.body, { x: -10, y: 20 });

       //Matter.Body.setAngle(entities.Square.body, 0.1);

       //Matter.Body.setAngularVelocity(entities.Square.body,1);

      //Matter.Body.applyForce(entities.Square.body,entities.Square.body.position,{ x: 0, y: 1 } );  //F = m a
      
      
  //});
 
Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;

    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;
    if (objALabel === "Box" && objBLabel === "BoundaryBottom") {
      Matter.Body.setVelocity(entities.Square.body, {
        x: 1,
        y: 0,
      });
    }
else if (objALabel === "Box" && objBLabel === "BoundaryRight") {
          Matter.Body.setVelocity(entities.Square.body, {
            x: 0,
            y: -5,
          });
        } 
else if (objALabel === "Box" && objBLabel === "BoundaryTop") {
          Matter.Body.setVelocity(entities.Square.body, {
            x: -5,
            y: 0,
          });
        }

 });

 Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
