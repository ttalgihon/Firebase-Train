// Initialize Firebase
let config = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    databaseURL: DATABASEURL,
    projectId: PROJECTID,
    storageBucket: STORAGE,
    messagingSenderId: MESSAGINGSENDERID
};
// Initialize the default app
let defaultApp = firebase.initializeApp(config);
console.log(defaultApp); //Check chrome inspector

// Firebase Realtime Database (through the default app)
let defaultDatabase = defaultApp.database();
console.log(defaultDatabase); //Firebase works!