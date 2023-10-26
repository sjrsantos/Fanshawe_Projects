import React from "react";
import { View, Button, Alert } from "react-native";
import * as SMS from "expo-sms";

const message = "YOU ARE GOING TO SEND THE FOLLOWING INFO:\n";
const SendSMSScreen = () => {
  const userInfo =
    "Silvio Junior\n654 Main Street\nLondon, ON\n(555)-555-5555\ns_dossantosjunior@fanshaweonline.ca";

  const sendSMS = async () => {
    const phoneNumber = "5555555555";
    const smsBody = message + userInfo;

    try {
      const { result } = await SMS.sendSMSAsync([phoneNumber], smsBody);

      if (result === "sent") {
        Alert.alert("SMS Sent!", message + userInfo);
      } else {
        Alert.alert("SMS Failed to Send"); // note that when I changed the "phoneNumber" to a generic one; even sending returns me alert failed in Android
      }
    } catch (error) {
      console.error("Error sending SMS: ", error);
      Alert.alert("An error occurred while sending SMS.");
    }
  };

  return (
    <View>
      <Button title="Send SMS" onPress={sendSMS} />
    </View>
  );
};

export default SendSMSScreen;
