// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
});

// create two boxes and a ground
var boxA = Bodies.rectangle(300, 200, 280, 50);
//var boxB = Bodies.rectangle(450, 50, 80, 80);
//var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
//var ground2 = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
//Composite.add(engine.world, [boxA, boxB, ground]);
//Composite.add(engine.world, [boxA]);
//Composite.add(engine.world, [boxA, ground, ground2]);
//Composite.add(engine.world, [boxA, ground]);
Composite.add(engine.world, [boxA]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
