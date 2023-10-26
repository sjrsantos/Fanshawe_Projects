import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

import AddContactModal from './AddContactModal';


const MainScreen = () => {

  const [contacts, setContacts] = useState([
    { id: Math.random().toString(), name: 'Silvio Junior', phone: generateRandomMobileNumber() },
    { id: Math.random().toString(), name: 'Nikhil Sharma', phone: generateRandomMobileNumber() },
    { id: Math.random().toString(), name: 'Fanshawe College', phone: generateRandomMobileNumber() }
  ]);

  const deleteContact = (id) => {
    // Filter out the contact with the given ID
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const addContactHandler = (name, info) => {
    // Create a new contact object with unique ID
    const newContact = {
      id: Math.random().toString(),
      name: name,
      phone: info,
    };

    // Update the 'contacts' state by adding the new contact
    setContacts((prevContacts) => [...prevContacts, newContact]);

    // Close the modal
    setIsAddModalVisible(false);
  };

  const cancelAddContactHandler = () => {
    // Close the modal without adding a contact
    setIsAddModalVisible(false);
  };

  // This function is just for my practice, to generate random mobile numbers for my first 3 contacts provided in the begining
  function generateRandomMobileNumber() {
    const getRandomDigits = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
  
    const part1 = getRandomDigits(100, 999); // Generates a random number between 100 and 999
    const part2 = getRandomDigits(100, 999);
    const part3 = getRandomDigits(1000, 9999); // Generates a random number between 1000 and 9999
  
    return `${part1}-${part2}-${part3}`;
  }
  
  const randomMobileNumber = generateRandomMobileNumber();

  return (
    <View style={customStyles.container}>
      <Text style={customStyles.title}>Contact App - s_dossantosjunior</Text>
      <FlatList
        style={customStyles.contactList}
        contentContainerStyle={{ alignItems: 'center' }} // Center the contacts
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => deleteContact(item.id)}>
            <View style={customStyles.contactItem}>
              <Text style={customStyles.contactName}>{item.name} | </Text>
              <Text>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity>
        <View>
          <Button title="Add Contact" onPress={() => setIsAddModalVisible(true)} />
          <AddContactModal
            visible={isAddModalVisible}
            onAddContact={addContactHandler}
            onCancel={cancelAddContactHandler}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const customStyles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactList: {
    width: '100%',
    padding: 30,
  },
  contactItem: {
    flexDirection: 'row', // Display contact name and number horizontally
    alignItems: 'center', // Center items vertically
    padding: 15,
    marginVertical: 7,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 4,
    borderRadius: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainScreen;
