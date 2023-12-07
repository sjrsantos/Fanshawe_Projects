import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { openDatabase } from "expo-sqlite";
import {
  ActionSheetProvider,
  useActionSheet,
} from "@expo/react-native-action-sheet";

const db = openDatabase("favourite_moment.db");

const MainScreen = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [imageUri, setImageUri] = useState(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists moments (id integer primary key not null, quote text, imageUri text);"
      );
    });
  }, []);

  const pickImage = () => {
    const options = ["Take a Picture", "Choose from Gallery", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          let cameraResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!cameraResult.cancelled) {
            setImageUri(cameraResult.uri);
          }
        } else if (buttonIndex === 1) {
          let galleryResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!galleryResult.cancelled) {
            setImageUri(galleryResult.uri);
          }
        }
      }
    );
  };

  const saveNewMoment = async () => {
    if (!imageUri || !quote) {
      Alert.alert(
        "Incomplete",
        "Please select an image and enter a quote before saving."
      );
      return;
    }

    const newUri = FileSystem.documentDirectory + imageUri.split("/").pop();
    await FileSystem.copyAsync({
      from: imageUri,
      to: newUri,
    });

    db.transaction((tx) => {
      tx.executeSql(
        "insert into moments (quote, imageUri) values (?, ?)",
        [quote, newUri],
        () => {
          Alert.alert("Success", "Your moment has been saved.");
          setQuote("");
          setImageUri(null);
        },
        (t, error) => {
          console.error("Error saving moment: ", error);
        }
      );
    });
  };

  const viewNotes = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from moments", [], (_, { rows }) => {
        let data = "";
        rows._array.forEach((moment) => {
          data += `Image URI: ${moment.imageUri}, Note: ${moment.quote}\n`;
        });
        Alert.alert("Saved Data", data);
      });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.appTitle}>FINAL EXAM - Silvio</Text>
      <Text style={styles.username}>s_dossantosjunior</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>No Image Selected</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setQuote}
        value={quote}
        placeholder="Enter a memorable quote"
        multiline
        numberOfLines={4}
      />
      <Button title="Save New Moment" onPress={saveNewMoment} />
      <Button title="View Notes" onPress={viewNotes} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
});

export default function App() {
  return (
    <ActionSheetProvider>
      <MainScreen />
    </ActionSheetProvider>
  );
}
