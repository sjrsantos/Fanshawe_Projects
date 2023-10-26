import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddContactModal = (props) => {
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const addContactHandler = () => {
    // Validate input fields here
    if (contactName.trim() === '' || contactInfo.trim() === '') {
      return;
    }

    // Pass the new contact data to the parent component
    props.onAddContact(contactName, contactInfo);

    // Clear input fields
    setContactName('');
    setContactInfo('');
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text>Add Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Contact Name"
          value={contactName}
          onChangeText={(text) => setContactName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={contactInfo}
          onChangeText={(text) => setContactInfo(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={addContactHandler} />
          <Button title="Cancel" onPress={props.onCancel} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default AddContactModal;
