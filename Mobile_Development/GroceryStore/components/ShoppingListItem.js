import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ShoppingListItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        <Text>{props.listItem}</Text> 
      </View>
    </TouchableOpacity>
  );
};
/* Use props.listItem, not props.item */

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc", // gray
    borderColor: "black",
    borderWidth: 1,
  },
});

export default ShoppingListItem;
