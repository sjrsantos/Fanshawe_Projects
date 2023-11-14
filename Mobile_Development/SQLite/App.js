import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite"; // npx expo install expo-sqlite

export default function App() {
  [dataForDatabase, setDataForDatabase] = useState({});
  [dataFromDatabase, setDataFromDatabase] = useState("");

  const db = SQLite.openDatabase("myTestDB.db");
  console.log("DataBase Opened");

  useEffect(
    () => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ExampleTable (id INTEGER PRIMARY KEY NOT NULL, name TEXT, age INT, favouriteQuote TEXT, favouriteClass TEXT);",
          [],
          () => console.log("TABLE CREATED!"),
          (_, result) => console.log("TABLE CREATE failed:" + result)
        );
      });

      // retrieve the current contents of the DB tables we want
      retrieveFromDatabase();
    },
    // add [] as extra argument to only have this fire on mount and unmount (or else it fires every render/change)
    []
  );

  onNameChangeHandler = (value) => {
    setDataForDatabase((prevState) => ({ ...prevState, name: value }));
  };

  onAgeChangeHandler = (value) => {
    setDataForDatabase((prevState) => ({ ...prevState, age: value }));
  };

  onFavouriteQuoteChangeHandler = (value) => {
    setDataForDatabase((prevState) => ({
      ...prevState,
      favouriteQuote: value,
    }));
  };

  onFavouriteClassChangeHandler = (value) => {
    setDataForDatabase((prevState) => ({
      ...prevState,
      favouriteClass: value,
    }));
  };

  saveToDatabase = () => {
    // transaction(callback, error, success)
    db.transaction((tx) => {
      // executeSql(sqlStatement, arguments, success, error)
      tx.executeSql(
        "INSERT INTO ExampleTable (name, age, favouriteQuote, favouriteClass) values (?, ?, ?, ?)",
        [
          dataForDatabase.name,
          dataForDatabase.age,
          dataForDatabase.favouriteQuote,
          dataForDatabase.favouriteClass,
        ],
        (_, { rowsAffected }) =>
          rowsAffected > 0
            ? console.log("ROW INSERTED!")
            : console.log("INSERT FAILED!"),
        (_, result) => console.log("INSERT failed:" + result)
      );
    });
    retrieveFromDatabase();
  };

  retrieveFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ExampleTable",
        [],
        (_, { rows }) => {
          console.log("ROWS RETRIEVED!");

          // clear data currently stored
          setDataFromDatabase(""); // Empty the data from database

          let entries = rows._array;

          entries.forEach((entry) => {
            setDataFromDatabase(
              (prev) =>
                prev +
                `${entry.id}, ${entry.name}, ${entry.age}, ${entry.favouriteQuote}, ${entry.favouriteClass}\n`
            );
          });
        },
        (_, result) => {
          console.log("SELECT failed!");
          console.log(result);
        }
      );
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <Text style={styles.header}>A FORM TO SAVE TO THE DB</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onNameChangeHandler}
            placeholder="some text here"
          />
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onAgeChangeHandler}
            placeholder="some text here"
          />
          <Text style={styles.label}>Favourite Quote</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onFavouriteQuoteChangeHandler}
            placeholder="some text here"
          />
          <Text style={styles.label}>Favourite Class</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onFavouriteClassChangeHandler}
            placeholder="some text here"
          />
          <Button
            style={styles.button}
            title="Save To SQLite DB"
            onPress={saveToDatabase}
          />
        </View>
        <View>
          <Text style={styles.label}>CONTENTS CURRENTLY IN DB</Text>
          <Text style={styles.dbOutput}>{dataFromDatabase}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
    marginTop: 60,
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  dbOutput: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  button: {
    width: "40%",
    alignContent: "center",
  },
});
