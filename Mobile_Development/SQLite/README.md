# SQLite Database Integration in React Native

This project showcases how to integrate SQLite with a React Native application to perform basic database operations. It demonstrates creating a database, adding a table, and implementing CRUD (Create, Read, Update, Delete) functionalities using SQLite within a mobile application environment.

## Project Overview

The application is built with React Native and uses the `expo-sqlite` package to manage a local SQLite database. It provides a simple user interface to input data (such as name, age, favourite quote, and favourite class) and save it to the database. The app also retrieves and displays this data from the database, offering a practical example of using SQLite for data persistence in React Native apps.

## Features

- **SQLite Database Creation and Management**: Utilizes `expo-sqlite` to handle database operations.
- **Data Input and Retrieval**: Allows users to input their details and retrieve them from the database, showcasing CRUD operations.
- **User-friendly Interface**: Simple and intuitive UI built with React Native components.

## Installation

To run this project, you'll need to have Node.js, npm, and Expo CLI installed on your computer. Follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:

```bash
npm install
```

3. Start the project with Expo:

```bash
expo start
```

4. Scan the QR code with the Expo Go app on your mobile device or use an Android/iOS emulator on your computer to run the app.

## Usage

Upon launching the app, you'll be presented with a form to enter your details (name, age, favourite quote, and favourite class) and a button to save this data to the SQLite database. Below the form, the app displays all entries currently stored in the database.

## Contributing

Contributions to this project are welcome! Please fork the repository, make your changes, and submit a pull request for review.
