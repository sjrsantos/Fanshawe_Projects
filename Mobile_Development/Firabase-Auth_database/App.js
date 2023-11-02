// App.js
import React, { useEffect } from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./components/MainScreen";
import RegisterUser from "./components/RegisterUser";
import AuthHandler from "./components/AuthHandler";
import { auth } from "./firebaseConfig";
import { AuthProvider, useAuth } from "./AuthContext"; // Import the context
import UserProfile from "./components/UserProfile";

const Stack = createStackNavigator();

function MainApp() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "AuthHandler" : "Main"}>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ title: "User Profile" }}
        />
        <Stack.Screen
          name="AuthHandler"
          component={AuthHandler}
          options={{ title: "Auth Handler", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
