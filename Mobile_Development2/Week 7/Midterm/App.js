// root/App.js
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useEffect, useState } from "react";
import Physics from "./Physics";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = () => {
    setIsGameOver(false); // Hide the "START GAME" button
    gameEngine.swap(entities());
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        style={styles.gameContainer}
        onEvent={(e) => {
          if (e.type === "game_over") {
            setIsGameOver(true);
            setRunning(false);
          }
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
            }}
            style={styles.buttonup}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-down" });
            }}
            style={styles.buttondown}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Down</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-left" });
            }}
            style={styles.buttonleft}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Left</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-right" });
            }}
            style={styles.buttonright}
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Right</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlRow}>
        <TouchableOpacity
          onPress={() => {
            gameEngine.dispatch({ type: "stop-moving" });
          }}
          style={styles.buttonstop}
        >
          <View style={styles.control}>
            <Text style={styles.centerText}>Stop</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={() => {
            setRunning(true);
            setIsGameOver(false);
            gameEngine.swap(entities()); // Reinitialize entities to restart the game
          }}
          disabled={!isGameOver} // Disable the button if the game is not over
        >
          <Text style={styles.centerText}>START GAME</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.watermark}>Silvio dos Santos Junior</Text>
    </View>
  );
}

// Styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  watermark: {
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontSize: 22,
    top: -20,
  },
  buttonup: {
    left: 0,
    top: -10,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "white",
    padding: 16,
  },
  buttondown: {
    left: 0,
    top: 5,
    right: 0,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "white",
    padding: 16,
  },
  buttonleft: {
    left: -100,
    top: -50,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "white",
    padding: 16,
  },
  buttonright: {
    left: 100,
    top: -105,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "white",
    padding: 16,
  },
  buttonstop: {
    left: 0,
    top: -90,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "white",
    padding: 16,
  },
  centerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
