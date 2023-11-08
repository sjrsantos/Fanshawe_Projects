import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [availableStorage, setAvailableStorage] = useState();
  const [totalStorage, setTotalStorage] = useState();
  const [messageForFile, setMessageForFile] = useState("");
  const [messageFromFile, setMessageFromFile] = useState("");
  const [documentDirectoryContents, setDocumentDirectoryContents] =
    useState("");

  useEffect(() => {
    FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) => {
      setAvailableStorage(freeDiskStorage / (1024 * 1024 * 1024)); // Convert to Gigabytes
    });

    FileSystem.getTotalDiskCapacityAsync().then((diskCapacity) => {
      setTotalStorage(diskCapacity / (1024 * 1024 * 1024)); // Convert to Gigabytes
    });
  }, []);

  const saveToFile = () => {
    const filePath = FileSystem.documentDirectory + "MyNewTextFile.txt";
    FileSystem.writeAsStringAsync(filePath, messageForFile, {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(() => {
        console.log("File is written");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const readFromFile = () => {
    const filePath = FileSystem.documentDirectory + "MyNewTextFile.txt";
    FileSystem.readAsStringAsync(filePath)
      .then((result) => {
        setMessageFromFile(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDocumentDirectoryContents = () => {
    const uri = FileSystem.documentDirectory;
    FileSystem.readDirectoryAsync(uri)
      .then((result) => {
        let contentString = "";
        result.forEach((value, index) => {
          contentString += `[${index}] = ${value} \n`;
        });
        setDocumentDirectoryContents(contentString);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeHandler = (text) => {
    setMessageForFile(text);
  };

  return (
    <View style={styles.form}>
      <View style={styles.section}>
        <Text style={styles.header}>FileSystem Example</Text>
        <Text style={styles.label}>
          You currently have{" "}
          {availableStorage ? availableStorage.toFixed(2) : "..."} GB out of
          total {totalStorage ? totalStorage.toFixed(2) : "..."} GB to store
          data
        </Text>
      </View>

      <View style={styles.section}>
        <TextInput
          style={styles.textInput}
          placeholder="Message to store in the file"
          onChangeText={onChangeHandler}
        />
        <Button
          style={styles.button}
          title="Save text to the file"
          onPress={saveToFile}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Contents from the file are:</Text>
        <Text style={styles.fileOutput}>{messageFromFile}</Text>
        <Button
          style={styles.button}
          title="Retrieve from file"
          onPress={readFromFile}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Document Directory Contents are:</Text>
        <Text style={styles.directoryOutput}>{documentDirectoryContents}</Text>
        <Button
          style={styles.button}
          title="Get Document Directory Contents"
          onPress={getDocumentDirectoryContents}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
    marginTop: 60,
  },
  section: {
    paddingBottom: 30,
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  directoryOutput: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  fileOutput: {
    borderColor: "red",
    borderWidth: 1,
    margin: 1,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  button: {
    width: "40%",
    alignContent: "center",
  },
});
