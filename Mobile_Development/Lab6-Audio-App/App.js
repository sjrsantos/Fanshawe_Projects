import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

export default function App() {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null); // Store the recorded URI

  useEffect(() => {
    verifyPermissions();
  }, []);

  const verifyPermissions = async () => {
    const result = await Audio.requestPermissionsAsync();
    if (result.granted) {
      return true; // Return true if permissions are granted
    } else {
      alert("Please grant audio permissions!");
      return false; // Return false if permissions are not granted
    }
  };

  const startRecordingAudio = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return false;
    } else {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      try {
        let newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        await newRecording.startAsync();
        setRecording(newRecording);
        setIsRecording(true);
        console.log("We are now recording");
      } catch (error) {
        console.log("An error has occured");
      }
    }
  };

  const stopRecordingAudio = async () => {
    try {
      setIsRecording(false);
      setIsPlaybackAllowed(true);

      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordedUri(uri);
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound); // Create the sound object here and store it in state
        setRecording(null);
        console.log("Recording Stopped and saved at: ", uri);
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const playRecordedAudio = async () => {
    console.log("Playing Sound");
    if (sound) {
      await sound.playAsync();
    } else {
      console.log("Sound is not loaded");
    }
  };

  const pausePlayback = async () => {
    if (sound) {
      console.log("Pausing Playback");
      await sound.pauseAsync();
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      console.log("Stopping Playback");
      await sound.stopAsync(); // Stop the playback
      await sound.setPositionAsync(0); // Reset the position to the beginning.
    }
  };

  const restartPlayback = async () => {
    if (sound) {
      await sound.setPositionAsync(0); // Reset to start
      await sound.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab 6 - Audio App</Text>
      <Text style={styles.username}>s_dossantosjunior</Text>
      <View style={styles.buttonContainer}>
        {!isRecording && !isPlaybackAllowed && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Record button pressed");
              startRecordingAudio();
            }}
          >
            <Text style={styles.buttonText}>Record</Text>
          </TouchableOpacity>
        )}
        {isRecording && (
          <TouchableOpacity style={styles.button} onPress={stopRecordingAudio}>
            <Text style={styles.buttonText}>Stop Recording</Text>
          </TouchableOpacity>
        )}
        {isPlaybackAllowed && (
          <>
            <TouchableOpacity style={styles.button} onPress={playRecordedAudio}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pausePlayback}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={stopPlayback}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={restartPlayback}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  username: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#E57373",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
    minWidth: 150,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
