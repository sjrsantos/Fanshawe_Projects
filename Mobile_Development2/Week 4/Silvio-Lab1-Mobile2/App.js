// App.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Box } from "./components/Box";
import { Boundary } from "./components/Boundary";
import { Constants } from "./Constants";
import Matter from "matter-js";
import entities from "./entities/index";
import Physics from "./Physics";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [greenBoxDirection, setGreenBoxDirection] = useState("down");

  useEffect(() => {
    const animationInterval = setInterval(() => {
      const boxBody = entities().box.body;

      switch (greenBoxDirection) {
        case "down":
          // Apply downward force (negative y-direction) to move the box down
          Matter.Body.applyForce(boxBody, boxBody.position, {
            x: 0,
            y: 0.01,
          });
          if (boxBody.position.y >= Constants.SCREEN_HEIGHT) {
            // If it reaches the bottom boundary, change direction to "right"
            setGreenBoxDirection("right");
          }
          break;
        case "right":
          // Apply rightward force (positive x-direction) to move the box right
          Matter.Body.applyForce(boxBody, boxBody.position, {
            x: 0.01,
            y: 0,
          });
          if (boxBody.position.x >= Constants.SCREEN_WIDTH) {
            // If it reaches the right boundary, change direction to "up"
            setGreenBoxDirection("up");
          }
          break;
        case "up":
          // Apply upward force (positive y-direction) to move the box up
          Matter.Body.applyForce(boxBody, boxBody.position, {
            x: 0,
            y: -0.01,
          });
          if (boxBody.position.y <= 0) {
            // If it reaches the top boundary, change direction to "left"
            setGreenBoxDirection("left");
          }
          break;
        case "left":
          // Apply leftward force (negative x-direction) to move the box left
          Matter.Body.applyForce(boxBody, boxBody.position, {
            x: -0.01,
            y: 0,
          });
          if (boxBody.position.x <= 0) {
            // If it reaches the left boundary, change direction to "down"
            setGreenBoxDirection("down");
          }
          break;
        default:
          break;
      }
    }, 1000 / 60); // 60 frames per second

    return () => clearInterval(animationInterval);
  }, [greenBoxDirection]); // Add greenBoxDirection to the dependency array

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={entities()}
        style={styles.gameContainer}
      >
        <Box body={entities().box.body} color="green" />
        <Box body={entities().redBox.body} color="red" />
        <Boundary body={entities().topRedBoundary.body} color="red" />
        <Boundary body={entities().bottomRedBoundary.body} color="red" />
        <Boundary body={entities().leftRedBoundary.body} color="red" />
        <Boundary body={entities().rightRedBoundary.body} color="red" />
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
