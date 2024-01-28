// App.js
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import initializeEntities from "./entities"; // Import the initializeEntities function
import Physics from "./Physics";
import { StatusBar } from "expo-status-bar";
import { Constants } from "./Constants"; // Import Constants

export default function App() {
  const [greenBoxDirection, setGreenBoxDirection] = useState("down");
  const entities = useRef(initializeEntities()); // Use useRef to store entities

  console.log("Initial entities:", entities.current); // Add this line

  useEffect(() => {
    const animationInterval = setInterval(() => {
      // Add debugging: Check if entities.current is defined
      if (!entities.current) {
        console.error("entities.current is undefined");
        return;
      }

      const { box, player } = entities.current; // Destructure entities.current

      // Check if box and player are defined
      if (!box || !player) {
        console.error("box or player is undefined");
        return;
      }

      // Check if box and player are defined
      if (box && player) {
        const boxBody = box.body;
        const greenBoxBody = player.body;

        // // Log the values of box.body and player.body
        // console.log("box.body:", boxBody);
        // console.log("player.body:", greenBoxBody);

        // // Log the values of box and player
        // console.log("box:", box);
        // console.log("player:", player);

        // Get the current position of the green box
        const { x, y } = boxBody.position;

        // Check if the green box reaches the boundaries
        if (
          x >= Constants.SCREEN_WIDTH ||
          x <= 0 ||
          y >= Constants.SCREEN_HEIGHT ||
          y <= 0
        ) {
          // Change the direction of the green box based on the boundary it reaches
          if (x >= Constants.SCREEN_WIDTH) {
            setGreenBoxDirection("left");
          } else if (x <= 0) {
            setGreenBoxDirection("right");
          } else if (y >= Constants.SCREEN_HEIGHT) {
            setGreenBoxDirection("up");
          } else if (y <= 0) {
            setGreenBoxDirection("down");
          }
        }

        // Apply forces based on the direction
        switch (greenBoxDirection) {
          case "down":
            Matter.Body.applyForce(boxBody, boxBody.position, { x: 0, y: 2 });
            break;
          case "right":
            Matter.Body.applyForce(boxBody, boxBody.position, { x: 2, y: 0 });
            break;
          case "up":
            Matter.Body.applyForce(boxBody, boxBody.position, { x: 0, y: -2 });
            break;
          case "left":
            Matter.Body.applyForce(boxBody, boxBody.position, { x: -2, y: 0 });
            break;
          default:
            break;
        }
      }
    }, 1000 / 60); // 60 frames per second

    // Log the value of entities.current
    console.log("entities.current:", entities.current);

    return () => clearInterval(animationInterval);
  }, [greenBoxDirection]);

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={entities.current} // Access entities using .current
        style={styles.gameContainer}
      >
        {/* Render views directly instead of using Box and Boundary components */}
        <View
          style={{
            position: "absolute",
            left:
              entities.current.player.body.position.x -
              entities.current.player.width / 2,
            top:
              entities.current.player.body.position.y -
              entities.current.player.height / 2,
            width: entities.current.player.width,
            height: entities.current.player.height,
            backgroundColor: "green",
          }}
        />
        <View
          style={{
            position: "absolute",
            left:
              entities.current.box.body.position.x -
              entities.current.box.width / 2,
            top:
              entities.current.box.body.position.y -
              entities.current.box.height / 2,
            width: entities.current.box.width,
            height: entities.current.box.height,
            backgroundColor: "red",
          }}
        />
        <View
          topRedBoundary
          bottomRedBoundary
          leftRedBoundary
          rightRedBoundary
        />
        <StatusBar style="auto" />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
