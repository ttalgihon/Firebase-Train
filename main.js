// Initialize Firebase
let config = {
  apiKey: "AIzaSyAKbZge9Fv_pjpRiTWS8rP-KJhuLUggAIU",
  authDomain: "fir-train-fb7a6.firebaseapp.com",
  databaseURL: "https://fir-train-fb7a6.firebaseio.com",
  projectId: "fir-train-fb7a6",
  storageBucket: "fir-train-fb7a6.appspot.com",
  messagingSenderId: "529292382408"
};
let defaultApp = firebase.initializeApp(config);

// Firebase Realtime Database (through the default app)
let defaultDatabase = defaultApp.database();

// 3. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  // Prevents the default form submit behavior
  event.preventDefault();

  // Grabs user input
  let trainName = $("#train-name-input")
    .val()
    .trim();
  let destination = $("#destination-input")
    .val()
    .trim();
  let firstTrain = $("#first-train-input")
    .val()
    .trim();
  let frequency = $("#frequency-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding train data from user input
  let tempTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Confirm Alert
  if (window.confirm("Your train data will now be added to the database.")) {
    // Uploads the 'temptrain' object data to the firebase.database
    defaultDatabase.ref('trains').push(tempTrain);
  }
  else {
    alert("Please submit you data again when you think it's correct.")
  };

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 4. Creates a Firebase event for adding trains from the database in a row on the HTML table.
/*The child_added event is typically used when retrieving a list of items from the database. 
Unlike value which returns the entire contents of the location, child_added is triggered 
once for each existing child and then again every time a new child is added to the specified path.*/
defaultDatabase.ref('trains').on('child_added', function(snapshot, prevChildKey) {
  const train = snapshot.val();
  console.log(train)

  // Take the data from the database and seperates it into indiviual variables.
  let tName = train.name;
  let tDestination = train.destination;
  let tFrequency = train.frequency;
  let tFirstTrain = train.firstTrain;

  let timeArrive = tFirstTrain.split(":"); //takes out :
  let trainTime = moment().hours(timeArrive[0]).minutes(timeArrive[1]);
  let maxMoment = moment.max(moment(), trainTime);

  let tMinutesAway;
  let tArrival;
  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutesAway = trainTime.diff(moment(), "minutes");
  } else {
    let differenceTimes = moment().diff(trainTime, "minutes");
    const tRemainder = differenceTimes % tFrequency;
    tMinutesAway = tFrequency - tRemainder;
    // To calculate the arrival time, add the tMinutesAway to the current time
    tArrival = moment().add(tMinutesAway, "m").format("hh:mm A");
  }

  // Add each train's data into the table
  $("#tableID > tbody").append(
    $("<tr>").append(
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutesAway)
    )
  );
});