// root/App.js
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useEffect, useState } from "react";
import Physics from "./Physics";
export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        style={styles.gameContainer}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              gameEngine.dispatch({ type: "move-up" });
            }}
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
          >
            <View style={styles.control}>
              <Text style={styles.centerText}>Down</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.watermark}>Your name here</Text>
    </View>
  );
}

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
  // add additional styles here
});
