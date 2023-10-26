import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";

export default function App() {
  const [message, setMessage] = useState("");

  const onChangeHandler = (text) => {
    setMessage(text);
  };

  const sendMessageWithSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ["1213272322", "23728237232"],
        message
      );
      console.log(result);
    } else {
      Alert.alert("SMS is not available");
    }
  };

  const sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: ["s_dossantosjunior@fanshaweonline.ca"],
        subject: "Class Code",
        body: message,
      };
      MailComposer.composeAsync(options).then((result) =>
        console.log(result.status)
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Enter a message to send!</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={10}
          onChangeText={onChangeHandler}
          placeholder="Some message here"
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Send via SMS"
            onPress={sendMessageWithSMS}
          />
          <Button
            style={styles.button}
            title="Send via Email"
            onPress={sendMessageWithEmail}
          />
        </View>
      </View>
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
  form: {
    margin: 30,
    marginTop: 60,
  },
  label: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
