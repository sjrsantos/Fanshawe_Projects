import Matter, { Sleeping } from "matter-js";
import Box from "./components/Box";
const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      if (entities.MonsterA.animOpitons.animType === "walk") {
      }

      entities.MonsterA.animOpitons.animType = "walk"; // set the cycle to walk after pressing the screen.
    });
  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    //objDel = pairs[0].bodyB;
    var objA = pairs[0].bodyA.label;
    var objB = pairs[0].bodyB.label;
    if (
      (objA == "Candle" && objB == "Monster") ||
      (objA === "Monster" && objB === "Candle")
    ) {
      entities.MonsterA.animOpitons.animType = "die";

      Sleeping.set(entities.MonsterA.body, true);

      setTimeout(() => {
        Matter.Composite.remove(engine.world, entities.MonsterA.body);
        entities.MonsterA.animOpitons.visibility = "none";
      }, 1900);
    }
  });

  return entities;
};

export default Physics;
