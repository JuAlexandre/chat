# chat

## Use with Firebase Realtime Database
Clone this and follow the installation process :
```
git clone https://github.com/JuAlexandre/chat/tree/1.0
```

## Use with Cloud Firestore
Clone this and follow the installation process :
```
git clone https://github.com/JuAlexandre/chat/tree/2.0
```

## Installation

Move in the cloned folder and install dependencies :
```
$ cd chat
$ yarn install
```

Create a file named `firebaseConfig.js` at the root of your project with the configuration of your Firebase project :
```js
export const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "..."
};
```