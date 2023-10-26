import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';


import GroceryItemInput from './components/GroceryIteminput';
import ShoppingListItem from './components/ShoppingListItem';


export default function App() {

// We are going to create a grocer list app.
// Add contacts -> Modal -> Text input and Add button.
// List items should appear on the Home Screen

const [ShoppingList, setShoppingList] = useState([]); // returns a state variable and a function to update it.
const [isAddMode, setIsAddMode] = useState();

const addGroceryItemHandler = (groceryItem) => {
  setShoppingList(ShoppingList => [...ShoppingList, {key : Math.random().toString(), value: groceryItem}])
  setIsAddMode(false)
}

const removeGroceryItemHandler = itemId => {
  setShoppingList(
    ShoppingList => {
      return ShoppingList.filter(item => item.key != itemId)
    }
  )
}


  return (
    <View style={styles.container}>
      <Button title='Add New Item' onPress={()=>setIsAddMode(true)}/>
      <GroceryItemInput visible={isAddMode} onCancel={()=> setIsAddMode(false)} onAddItem = {addGroceryItemHandler}/>
      <FlatList data={ShoppingList}
        renderItem={
          itemData => (
            <ShoppingListItem id={itemData.item.key}
            onDelete={removeGroceryItemHandler}
            listItem = {itemData.item.value} // Use "listItem" instead of "item" trying to fix the problem
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
