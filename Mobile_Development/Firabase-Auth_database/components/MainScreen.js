// MainScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signInWithEmail } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function MainScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const onLogin = () => {
    signInWithEmail(email, password)
      .then((userCredential) => {
        navigation.navigate("UserProfile", { userId: userCredential.user.uid });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mobile Development - s_dossantosjunior - Lab 5 - Firebase Authentication
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={onLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("RegisterUser")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: "gray" },
});
