import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";

export default function App() {
  return (
    <View style={styles.container}>
      <GameEngine entities={entities()} style={styles.gameContainer}>
        <StatusBar style="auto" />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
