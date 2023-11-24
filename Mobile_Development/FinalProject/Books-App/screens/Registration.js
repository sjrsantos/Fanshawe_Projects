import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { ref, set } from "firebase/database";
import * as MailComposer from "expo-mail-composer";
import { app, auth, database } from "./firebaseConfig";

const Registration = () => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault(); // prevent the form from refreshing the page
    createUserWithEmailAndPassword(
      auth,
      registrationEmail,
      registrationPassword
    )
      .then((userCredential) => {
        // Save user information to the database
        const userId = userCredential.user.uid;
        const userRef = ref(database, `users/${userId}`);
        set(userRef, {
          firstName,
          lastName,
          phoneNumber,
        });

        // Send email verification
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email sent
            MailComposer.composeAsync({
              recipients: [registrationEmail],
              subject: "Email Verification",
              body: "Please verify your email address.",
            });
          })
          .catch((error) => {
            console.log("Error sending email verification:", error);
          });
      })
      .catch((error) => {
        console.log("Error creating user:", error);
      });
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleRegistration}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={registrationEmail}
          onChange={(e) => setRegistrationEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={registrationPassword}
          onChange={(e) => setRegistrationPassword(e.target.value)}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
