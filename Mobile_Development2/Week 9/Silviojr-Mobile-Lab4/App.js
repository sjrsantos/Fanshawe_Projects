import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Dimensions, Image } from "react-native";
// import Matter from "matter-js";
import entities from "./entities";
import Physics from "./Physics";
import React, { useEffect, useState } from "react";
// import SpriteSheet from "rn-sprite-sheet";
import Constants from "./Constants";
import Images from "./Images";
export default function App() {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    setRunning(true);
  }, []);
  let mummy = null;
  let startAnimate = (type) => {
    mummy.play({
      type: type,
      fps: 24,
      loop: true,
      onFinish: () => {
        console.log("he");
      },
    });
  };
  return (
    <View style={styles.container}>
      <Image
        source={Images.Background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        systems={[Physics]}
        entities={entities()}
        running={running}
        style={styles.gameContainer}
      >
        {<StatusBar style="auto" hidden={true} />}
        <Text style={styles.watermark}>Silvio dos Santos Junior</Text>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
  },
  watermark: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    bottom: 250,
    left: "25%",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    fontSize: 20,
  },
});
