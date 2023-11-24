// BookDetails.js displays the details of a book. The user can go back to the previous screen by clicking on the back button.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import booksData from "../components/books.json";

const BookDetails = ({ navigation, route }) => {
  const { bookId } = route.params;
  const book = booksData.find((item) => item.id === bookId);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.bookContainer}>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.category}>{book.category}</Text>
        <Text style={styles.description}>{book.description}</Text>
        <Text style={styles.rating}>Rating: {book.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  bookContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bookImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookDetails;
