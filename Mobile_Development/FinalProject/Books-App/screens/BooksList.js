// BookList.js: Displays the list of books in a carousel format. The user can swipe through the books and logout of the app.
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import booksData from "./booksData.json"; // Assuming the JSON file is in the same directory

const BooksList = () => {
  const renderBookItem = ({ item }) => {
    return (
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 200, height: 300 }}
        />
        <Text>{item.title}</Text>
        <Text>{item.author}</Text>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={booksData}
        renderItem={renderBookItem}
        sliderWidth={300}
        itemWidth={200}
      />
      <TouchableOpacity style={{ position: "absolute", top: 10, right: 10 }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BooksList;
