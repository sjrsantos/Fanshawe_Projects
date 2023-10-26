import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./components/MainScreen";
import SendEmailScreen from "./components/SendEmailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main Screen" component={MainScreen} />
        <Stack.Screen name="SendEmail" component={SendEmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
