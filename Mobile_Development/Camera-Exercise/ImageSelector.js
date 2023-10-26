import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";

const ImageSelector = (props) => {
  const verifyPermissions = async () => {
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const libraryResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraResult.status !== "granted" &&
      libraryResult.status !== "granted"
    ) {
      Alert.alert("Grant Permissions first to use the app", [{ text: "OK" }]);
      return false;
    } else {
      return true;
    }
  };

  const retrieveImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      console.log("We do not have permissions");
      return false;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!image.canceled) {
      props.onImageSelected(image.assets[0].uri);
    }
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      console.log("We do not have permissions");
      return false;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      props.onImageSelected(image.assets[0].uri);
    }
  };

  return (
    <View style={styles.containder}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Retrieve From Gallery"
          onPress={retrieveImageHandler}
        ></Button>
        <Button
          style={styles.button}
          title="Capture the Image"
          onPress={takeImageHandler}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containder: {
    padding: 10,
    margin: 5,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    minHeight: 100,
  },
  button: {
    paddingVertical: 25,
    width: "100%",
  },
});

export default ImageSelector;
