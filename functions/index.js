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

exports.addPhysician = functions.https.onRequest((req, res) =>{
    
        const name  = req.query.name;
        const specialty  = req.query.specialty;
        const crm  = req.query.crm;
        const gender  = req.query.gender;
        const date = Date();
    
        admin.database().ref('/physicians').push({name: name, 
                                            specialty: specialty,
                                            crm: crm,
                                            gender: gender,
                                            date: date
                                        }).then(snapshot => {
            
            res.status(200).json({name: name, 
                specialty: specialty,
                crm: crm,
                gender: gender,
                date: date
            });
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

exports.getPhysicians = functions.https.onRequest((req, res) =>{
    var messagesDB = admin.database().ref('physicians');
    messagesDB.once('value').then(function(snap) {
        res.status(200).json({physicians: snap.val()});
      });
});

exports.getPhysician = functions.https.onRequest((req, res) =>{

    var messagesDB = admin.database().ref('physicians').child(req.query.uid);
    messagesDB.once('value').then(function(snap) {
        res.status(200).json({physicians: snap.val()});
      });
});

