import React from "react";
import { View, Button, Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";

const message = "YOU ARE GOING TO SEND THE FOLLOWING INFO:\n";
const SendEmailScreen = () => {
  const userInfo =
    "Silvio Junior\n654 Main Street\nLondon, ON\n(555)-555-5555\ns_dossantosjunior@fanshaweonline.ca";

  const sendEmail = async () => {
    const recipients = ["s_dossantosjunior@fanshaweonline.ca"];
    const subject = "This is just a test from Expo.";
    const body = userInfo;

    await MailComposer.composeAsync({
      recipients,
      subject,
      body,
    });

    Alert.alert("Email Sent!", message + userInfo);
  };

  return (
    <View>
      <Button title="Send Email" onPress={sendEmail} />
    </View>
  );
};

export default SendEmailScreen;
