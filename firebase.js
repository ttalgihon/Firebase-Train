require('dotenv').config();

// Initialize Firebase
let config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGE,
    messagingSenderId: process.env.MESSAGINGSENDERID
};
// Initialize the default app
let defaultApp = firebase.initializeApp(config);
console.log(defaultApp); //Check chrome inspector

// Firebase Realtime Database (through the default app)
let defaultDatabase = defaultApp.database();
console.log(defaultDatabase); //Firebase works!