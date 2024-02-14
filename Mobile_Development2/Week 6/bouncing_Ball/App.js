import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const image = {
    uri: "https://i.pinimg.com/564x/45/c0/4b/45c04b676f7905477b2b1bfce83f42f4.jpg",
  };

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={image} style={styles.image}>
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref);
          }}
          systems={[Physics]}
          entities={entities()}
          running={running}
          onEvent={(e) => {
            switch (e.type) {
              case "game_over":
                setRunning(false);
                gameEngine.stop();
                break;
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <StatusBar style="auto" hidden={true} />
        </GameEngine>

        {!running ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                paddingHorizontal: 30,
                paddingVertical: 5,
              }}
              onPress={() => {
                setRunning(true);
                //gameEngine.swap(entities());
                //swap - a  method that can be called to update your game with new entities. Can be useful for level switching etc
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 10 }}
              >
                START GAME
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
}
