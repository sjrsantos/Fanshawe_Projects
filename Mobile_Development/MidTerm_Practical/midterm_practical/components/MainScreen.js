import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MIDTERM</Text>
      <Text style={styles.subtitle}>s_dossantosjunior</Text>
      <Text style={styles.infoText}>
        Click The Button Below To Go To The Email Screen
      </Text>
      <Button
        title="SEND EMAIL"
        onPress={() => {
          // Navigate to the SendEmail screen when the button is pressed
          navigation.navigate("SendEmail");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    marginBottom: 70,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: "center",
  },
});

export default MainScreen;
