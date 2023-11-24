// App.js
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./components/MainScreen";
import RegisterUser from "./components/RegisterUser";
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
          name="UserLogin"
          component={MainScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Registration"
          component={RegisterUser}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="BooksList"
          component={UserProfile}
          options={{ title: "User Profile" }}
        />
        <Stack.Screen
          name="BooksDetails"
          component={UserProfile}
          options={{ title: "User Profile" }}
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
