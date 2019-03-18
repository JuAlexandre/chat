# chat

## Installation
Clone the repository and move in :
```
$ git clone https://github.com/JuAlexandre/chat.git
$ cd chat
```

Install dependencies :
```
yarn install
```

Create a file named ``firebaseConfig.js`` at the root of your project with the configuration of your Firebase project :
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

## Use with Firebase Realtime Database
On the master branch the chat use the Firebase Realtime Database, you can see it in the ``Fire.js`` file.

## Use with Cloud Firestore
Move into the ``firestore`` branch. You can see the code in the ``Fire.js`` file.