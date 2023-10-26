import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, ImageBase } from "react-native";

import ImageSelector from "./ImageSelector";

const TakePictureScreen = () => {
  const [selectedImage, setSelectedImage] = useState();

  imageSelectorHandle = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.label}>Let's Take a Picture !</Text>
        {!selectedImage && (
          <ImageSelector onImageSelected={imageSelectorHandle} />
        )}
        {selectedImage && (
          <View>
            <Image style={styles.Image} source={{ uri: selectedImage }}></Image>
            <Button title="Reset" onPress={() => setSelectedImage(null)} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 18,
    marginBottom: 30,
    marginTop: 10,
    textAlign: "center",
  },

  View: {
    margin: 400,
    width: 400,
  },
});

export default TakePictureScreen;
