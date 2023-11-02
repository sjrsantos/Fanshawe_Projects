// Register User
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebaseConfig";
import { registerWithEmail } from "../firebaseConfig";

export default function RegisterUser({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    try {
      const userCredential = await registerWithEmail(email, password);

      // Check if userCredential exists and has the user property
      if (userCredential && userCredential.user) {
        // Save user info to Firestore
        await addDoc(collection(firestore, "users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });

        alert("Registration successful!");
        navigation.goBack();
      } else {
        alert("There was an issue with registration.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
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
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: "gray" },
});
