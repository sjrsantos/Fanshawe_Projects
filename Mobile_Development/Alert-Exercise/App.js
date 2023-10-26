import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native";

const talkLaterDialogue = {
  text: "Ask me Later",
  onPress: () =>
    Alert.alert("Talk to you later", "We will talk to you in a bit", [
      { text: "close" },
    ]),
};

cancelDialogue = {
  text: "Cancel",
  onPress: () => console.log("Canceled Pressed"),
  style: "cancel",
};

questionDialogue = {
  text: "OK",
  onPress: () =>
    Alert.alert("Here is a question", "Do you like Soccer?", [
      {
        text: "Yes",
        onPress: () => {
          Alert.alert("Me Too");
        },
      },
      {
        text: "No",
        onPress: () => {
          Alert.alert("Unfortunate !");
        },
      },
    ]),
};

const promptForQuestionResponse = () => {
  Alert.alert(
    "Here is a Title",
    "Can I ask you a question?",
    [talkLaterDialogue, cancelDialogue, questionDialogue],
    {
      cancelable: false,
    }
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Let's check some alerts !</Text>
      <Button title="alert" onPress={() => promptForQuestionResponse()} />
      <StatusBar style="auto" />
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
  label: {
    paddingBottom: 25,
  },
});
