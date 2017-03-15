var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });

})

app.get('/api/users', function(req, res) {
  db.get_all_users(function (err, users) {
    console.log("all Users")
    console.log(users);
    res.send(users);
  });
});

app.get('/api/vehicles', function(req, res) {
  db.get_all_vehicles(function (err, vehicles) {
    console.log("All Vehicles")
    res.send(vehicles);
  });
});

app.post('/api/users', function(req, res) {
  console.log(req.body);
  var user = req.body;
  db.create_user(
    [user.firstname,
    user.lastname,
    user.email],function (err, result) {
    if (err) {
      res.status(500).send(err);
    }else {
      res.status(200).send(result);
    }
  });
});


// app.get('/', function(req, res) {
//   db.get_all_injuries(function (err, injuries) {
//     res.send(injuries);
//   });
// });
//
// app.get('/incidents', function(req, res) {
//   var state = req.query.us_state;
//
//   if (!state) {
//     db.get_all_incidents(function (err, incidents) {
//       res.send({
//         incidents: incidents
//       });
//     });
//   }else {
//     db.get_incidents_by_state([state],function (err, incidents) {
//       res.send({
//         incidents: incidents
//       });
//     });
//   }
// });
//
// app.post('/incidents', function(req, res) {
//   console.log(req.body);
//   var incident = req.body;
//   db.create_incident([incident.usState,
//     incident.injuryId,
//     incident.causeId],function (err, result) {
//     if (err) {
//       res.status(500).send(err);
//     }else {
//       res.status(200).send(result);
//     }
//   });
// });



app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
