// User Profile
import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import {
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import firestore from "../firebaseConfig";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Query users collection by email
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one user with this email
          const userSnapshot = querySnapshot.docs[0];
          setCurrentUser(userSnapshot.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, []);

  const userFirstName = currentUser?.firstName || "User";

  const handleSendEmailVerification = () => {
    const authUser = auth.currentUser;
    if (authUser && !authUser.emailVerified) {
      sendEmailVerification(authUser)
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
      <Text>Welcome, {userFirstName}!</Text>
      {currentUser && !currentUser.emailVerified && (
        <>
          <Text>Your email is not verified.</Text>
          <Button title="Verify Email" onPress={handleSendEmailVerification} />
        </>
      )}
    </View>
  );
}
