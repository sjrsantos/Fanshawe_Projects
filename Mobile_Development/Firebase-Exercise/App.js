import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { db, auth, firestore } from "./firebaseConfig";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // login
import { createUserWithEmailAndPassword } from "firebase/auth"; // register
import { registerRootComponent } from "expo";

export default function App() {
  // 2 text inputs for login (email/password)
  // 2 text inputs for registering (email/password)

  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert("Please enter a valid email address");
      return;
    }
    if (loginPassword.length < 4) {
      Alert.alert("Please enter a valid password");
      return;
    }
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        Alert.alert("User has logged in");
        setLoggedIn = true;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong Password");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert("Please enter a valid email address");
      return;
    }
    if (registrationPassword.length < 4) {
      Alert.alert("Please enter a valid password");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registrationEmail,
      registrationPassword
    )
      .then(() => {
        Alert.alert("User Registered");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          Alert.alert("Password is too weak");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Login</Text>
          <TextInput
            onChangeText={(value) => setLoginEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => setLoginPassword(value)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="visible-password"
            placeholder="password"
            secureTextEntry={true}
          />
          <Button title="Login" onPress={loginWithFirebase} />
        </View>
        <View>
          <Text>Register with Firebase</Text>
          <TextInput
            onChangeText={(value) => setRegistrationEmail(value)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => setRegistrationPassword(value)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="visible-password"
            placeholder="password"
            secureTextEntry={true}
          />
          <Button title="Register" onPress={registerWithFirebase} />
        </View>
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
});
