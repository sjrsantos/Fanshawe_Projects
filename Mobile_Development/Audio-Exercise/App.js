import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

export default function App() {
  let recording = null;
  let soundObject = null;

  const verifyPermissions = async () => {
    const result = await Audio.requestPermissionsAsync();
    if (result.granted) {
      return true;
    } else {
      return false;
    }
  };

  startRecordingAudio = async () => {
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
        recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        await recording.startAsync();
        console.log("We are now recording");
      } catch (error) {
        console.log("An error has occured");
      }
    }
  };

  stopRecordingAudio = async () => {
    try {
      await recording.stopAndUnloadAsync();
      // recording.getURI(); // Fetches the URI path to the recording saved.
      console.log("Recording Stopped and saved at: ", recording.getURI());
    } catch (error) {
      console.log("An error has occured \n", error);
    }
  };

  playRecordedAudio = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: recording.getURI() });
      await soundObject.setStatusAsync({ isLooping: true });
      await soundObject.playAsync();
      console.log("Playing Started");
    } catch (error) {
      console.log("An error has occured \n", error);
    }
  };

  stopPlayingRecordedAudio = async () => {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      console.log("Playing Stopped");
    } catch (error) {
      console.log("An error has occured \n", error);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          color="red"
          title="Start Recording Audio"
          onPress={startRecordingAudio}
        />
        <Button
          style={styles.button}
          color="red"
          title="Stop Recording Audio"
          onPress={stopRecordingAudio}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Play Recording"
          onPress={playRecordedAudio}
        />
        <Button
          style={styles.button}
          title="Stop Playback"
          onPress={stopPlayingRecordedAudio}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    margin: 30,
    justifyContent: "center",
  },
  buttonContainer: {
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
  },
});
