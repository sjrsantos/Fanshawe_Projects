// UserLogin.js is the same as MainScreen.js
import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { navigate } from "react-navigation";

const UserLogin = () => {
  const loginEmail = "";
  const loginPassword = "";

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        navigate("BooksList");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleRegister = () => {
    navigate("Registration");
  };

  return (
    <View>
      <Text>
        Welcome to{" "}
        <Text style={{ fontWeight: "bold" }}>Chapterverse - Book App</Text>
      </Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => (loginEmail = text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => (loginPassword = text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default UserLogin;
