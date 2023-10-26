import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import TakePictureScreen from "./TakePictureScreen";
// 1. Create a file: That has the UI, a tex, two buttons -- retrieve and use camera
// 2. Create a file: Actually show the picture, retrieve or capture from camera

export default function App() {
  return (
    <View>
      <TakePictureScreen />
    </View>
  );
}
