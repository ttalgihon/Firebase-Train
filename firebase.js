{/* <script src = "https://www.gstatic.com/firebasejs/5.9.1/firebase.js"></script> */}

// Initialize Firebase
let config = {
    apiKey: "AIzaSyAKbZge9Fv_pjpRiTWS8rP-KJhuLUggAIU",
    authDomain: "fir-train-fb7a6.firebaseapp.com",
    databaseURL: "https://fir-train-fb7a6.firebaseio.com",
    projectId: "fir-train-fb7a6",
    storageBucket: "fir-train-fb7a6.appspot.com",
    messagingSenderId: "529292382408"
};
// Initialize the default app
let defaultApp = firebase.initializeApp(config);
console.log(defaultApp); //Check chrome inspector

let defaultDatabase = defaultApp.database();
console.log(defaultDatabase); //works