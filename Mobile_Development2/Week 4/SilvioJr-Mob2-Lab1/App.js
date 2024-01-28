// App.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Constants } from "./Constants";
import { setupWorld } from "./entities";
import Physics from "./Physics";

const App = () => {
  const [entities, setEntities] = useState(setupWorld());

  return (
    <View style={styles.container}>
      <GameEngine systems={[Physics]} entities={entities}></GameEngine>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
