// AuthHandler.js
import React from "react";
import { View, Button, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function AuthHandler() {
  const navigation = useNavigation();

  const handleSendEmailVerification = () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          Alert.alert("Verification email sent. Please check your inbox.");
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    } else {
      Alert.alert("User not signed in or already verified.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Send Verification Email"
        onPress={handleSendEmailVerification}
      />
      <Button
        title="Return to MainScreen"
        onPress={() => navigation.navigate("Main")}
      />
    </View>
  );
}
