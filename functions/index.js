const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addMessage = functions.https.onRequest((req, res) =>{

    const original  = req.query.text;
    const formattedDate = Date();

    admin.database().ref('/messages').push({original: original, date: formattedDate}).then(snapshot => {
        
        console.log('Sending Formatted date:', formattedDate);
        res.status(200).json({ date: formattedDate });
    });
});

exports.getMessage = functions.https.onRequest((req, res) =>{
    var messagesDB = admin.database().ref('messages');
    messagesDB.once('value').then(function(snap) {
        res.status(200).json({messages: snap.val()});
      });
});

exports.getUsers = functions.https.onRequest((req, res) =>{
    var messagesDB = admin.database().ref('users');
    messagesDB.once('value').then(function(snap) {
        res.status(200).json({users: snap.val()});
      });
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
