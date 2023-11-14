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
import * as MediaLibrary from "expo-media-library";

const db = openDatabase("favourite_moment.db");

const MainScreen = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [imageUri, setImageUri] = useState(null);
  const [quote, setQuote] = useState("");
  const [dataSaved, setDataSaved] = useState(false);
  const [moments, setMoments] = useState([]);
  const [selectedMoment, setSelectedMoment] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists moments (id integer primary key not null, quote text, imageUri text);",
        [],
        () => {
          tx.executeSql("select * from moments", [], (_, { rows }) => {
            if (rows.length > 0) {
              const latestMoment = rows._array[0];
              setImageUri(latestMoment.imageUri);
              setQuote(latestMoment.quote);
              setDataSaved(true);
            }
          });
        },
        (t, error) => {
          console.error(error);
        }
      );
    });
  }, []);

  const chooseImageSource = async () => {
    const options = ["Take a Picture", "Upload from Library", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === cancelButtonIndex) return;

        try {
          if (buttonIndex === 0) {
            const cameraPermissionResult =
              await ImagePicker.requestCameraPermissionsAsync();

            if (cameraPermissionResult.granted === false) {
              Alert.alert("Camera access was denied");
              return;
            }

            const cameraResult = await ImagePicker.launchCameraAsync();
            if (!cameraResult.canceled) {
              handleImageResult(cameraResult);
            }
          } else if (buttonIndex === 1) {
            const libraryPermissionResult =
              await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (libraryPermissionResult.granted === false) {
              Alert.alert("Photo library access was denied");
              return;
            }

            const libraryResult = await ImagePicker.launchImageLibraryAsync();
            if (!libraryResult.canceled) {
              handleImageResult(libraryResult);
            }
          }
        } catch (error) {
          console.error(error);
          Alert.alert(
            "An error occurred while trying to access the camera or photo library"
          );
        }
      }
    );
  };

  const handleImageResult = async (pickerResult) => {
    if (pickerResult.canceled) {
      console.log("Image picker was canceled");
    } else if (pickerResult.assets && pickerResult.assets.length > 0) {
      const pickedImage = pickerResult.assets[0];
      if (pickedImage && pickedImage.uri) {
        console.log("Picked image URI:", pickedImage.uri);
        setImageUri(pickedImage.uri); // <-- This line saves the URI in the component state
      } else {
        console.error("No URI found for the picked image");
      }
    } else {
      console.error("No assets found in picker result");
    }
  };

  const saveNewMoment = async () => {
    try {
      // Check and request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Media library permissions not granted");
        return;
      }

      if (!imageUri || !quote) {
        Alert.alert(
          "Incomplete",
          "Please select an image and enter a quote before saving."
        );
        return;
      }

      console.log("Image URI before move:", imageUri);

      const fileInfo = await FileSystem.getInfoAsync(imageUri);

      if (!fileInfo || !fileInfo.exists) {
        Alert.alert(
          "Image not found",
          "The selected image file does not exist."
        );
        return;
      }

      let permanentUri = imageUri;

      if (!fileInfo.isDirectory) {
        // Try copying the file to a different directory (cache directory)
        const newFileName = `${new Date().getTime()}_moment_image.jpg`;
        const newFilePath = `${FileSystem.cacheDirectory}${newFileName}`;

        console.log("New file path:", newFilePath);

        try {
          await FileSystem.copyAsync({
            from: imageUri,
            to: newFilePath,
          });

          // Set the new URI if the copy was successful
          permanentUri = newFilePath;
          setImageUri(permanentUri);

          // Delete the original file (optional)
          await FileSystem.deleteAsync(imageUri, { idempotent: true });

          console.log("Image copied successfully:", permanentUri);
        } catch (error) {
          console.error("Copy Error: Failed to copy the image.", error);
          Alert.alert("Error", "Failed to save the image. " + error.message);
          return;
        }
      }

      db.transaction(
        (tx) => {
          tx.executeSql(
            "insert into moments (quote, imageUri) values (?, ?)",
            [quote, permanentUri],
            (_, result) => {
              setDataSaved(true);
              Alert.alert("Success", "Your moment has been saved.");
            },
            (t, error) => {
              Alert.alert("Error", "There was an error saving your moment.");
              console.error(error);
            }
          );
        },
        (error) => {
          console.error("Transaction error:", error);
        }
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while saving the moment.");
    }
  };

  const chooseMoment = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from moments", [], (_, { rows }) => {
        if (rows._array.length > 0) {
          const momentOptions = rows._array.map((moment, index) => ({
            id: moment.id,
            label: `Moment ${index + 1}`,
            ...moment,
          }));
          setMoments(momentOptions);

          // Present the options to the user using an action sheet
          const options = momentOptions.map((o) => o.label);
          options.push("Cancel");
          const cancelButtonIndex = options.length - 1;

          showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            (buttonIndex) => {
              if (buttonIndex !== cancelButtonIndex) {
                displaySelectedMoment(momentOptions[buttonIndex].id);
              }
            }
          );
        } else {
          Alert.alert("No saved moments found.");
        }
      });
    });
  };

  const displaySelectedMoment = (momentId) => {
    const selected = moments.find((moment) => moment.id === momentId);
    setSelectedMoment(selected);
    setImageUri(selected.imageUri); // Update the imageUri state to show the selected image
    setQuote(selected.quote); // Update the quote state to show the selected quote
  };

  const clearMoments = () => {
    db.transaction((tx) => {
      tx.executeSql("delete from moments", [], () => {
        setMoments([]);
        setSelectedMoment(null);
        Alert.alert("All saved moments have been cleared.");
      });
    });
  };

  const Placeholder = () => (
    <TouchableOpacity style={styles.placeholder} onPress={chooseImageSource}>
      <Text>No Image Selected</Text>
    </TouchableOpacity>
  );

  const appTitle = "My Favourite Moments";
  const username = "s_dossantosjunior";

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.appTitle}>{appTitle}</Text>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity
        onPress={chooseImageSource}
        style={styles.imageContainer}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Placeholder />
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
      <Button
        title="Save New Moment"
        onPress={saveNewMoment}
        style={styles.button}
      />
      <Button
        title="Choose a Moment"
        onPress={chooseMoment}
        style={styles.button}
      />
      <Button
        title="Clear Moments"
        onPress={clearMoments}
        style={styles.button}
      />
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
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  selectedMomentContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  selectedMomentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedMomentImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  selectedMomentText: {
    fontSize: 14,
  },
});

export default function App() {
  return (
    <ActionSheetProvider>
      <MainScreen />
    </ActionSheetProvider>
  );
}
