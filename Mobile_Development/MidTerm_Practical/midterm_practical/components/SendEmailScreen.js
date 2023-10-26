import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as MailComposer from "expo-mail-composer";

const SendEmailScreen = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: [email],
        subject: "Class Code",
        body: message,
      };
      MailComposer.composeAsync(options).then((result) => {
        if (result.status === "sent") {
          // Show a success alert
          alert("Your email has been sent!");
        } else {
          // Show an error alert
          alert("Error: Failed to send email!");
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        placeholder="example: s_dossantosjunior@fanshaweonline.ca"
      />
      <Text style={styles.label}>Message</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={10}
        onChangeText={(text) => setMessage(text)}
        placeholder="Your Message Goes Here"
      />
      <Button title="Send Email" onPress={sendMessageWithEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 12,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 21,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlignVertical: "top",
  },
});

export default SendEmailScreen;
