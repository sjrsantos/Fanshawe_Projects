import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet } from "react-native";
import SendEmailScreen from "./components/sendEmailScreen";
import SendSMSScreen from "./components/sendSMSScreen";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send My Info - Lab 4</Text>
      <Text style={styles.subTitle}>s_dossantosjunior</Text>
      <Button
        title="EMAIL MY INFO"
        onPress={() => navigation.navigate("SendEmail")}
      />
      <View style={{ height: 20 }} />
      <Button
        title="TEXT MY INFO"
        onPress={() => navigation.navigate("SendSMS")}
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
    marginTop: 20,
    fontSize: 40,
    padding: 10,
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 30,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SendEmail" component={SendEmailScreen} />
        <Stack.Screen name="SendSMS" component={SendSMSScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
