import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./Physics";


export default function App() {
  return (
    <View style={styles.container}>
       <GameEngine
        systems={[Physics]}
        entities={entities()}
        style={styles.gameContainer}>
        <StatusBar style="auto" />
      </GameEngine>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
});
