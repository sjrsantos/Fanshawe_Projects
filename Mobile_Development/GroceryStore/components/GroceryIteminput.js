import React, {useState} from "react";
//import { Text } from "react-native";
import { View, StyleSheet, TextInput, Button, Modal } from "react-native";

const GroceryItemInput = (props) =>
{
    const [enteredGroceryItem, setGroceryItem] = useState();

    const GroceryItemInputHandler = (value) => {
        setGroceryItem(value);
    }

    const addItemHandler = () =>
    {
        props.onAddItem(enteredGroceryItem);
    }

    return (
        <Modal visible={props.visible}>
            <View style={styles.InputContainer}>
                <TextInput style={styles.input} placeholder="Grocery Item" onChangeText={GroceryItemInputHandler} value={enteredGroceryItem}></TextInput>
                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button title="CANCEL" color="red" onPress={props.onCancel}/>
                    </View>
                    <View style = {styles.button}>
                        <Button title="ADD" onPress={addItemHandler}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create(
    {
        InputContainer : {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },

        input : {
            width: '80%',
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
        },
        
        buttonContainer : {
            flexDirection : 'row',
            justifyContent : 'center',
            width : '60%',
        }, 

        button : {
            width : '40%',
        }
    }
)

export default GroceryItemInput;