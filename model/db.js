var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/ffp_db');

// CONNECTION EVENTS
db.connection.on('connected', function() {
  console.log('Mongoose connected');
});

db.connection.once('open', function callback () {
  console.log("Mongoose open");
});

db.connection.on('error', function(err) {
  console.log('Mongoose error: ' + err);
});

db.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
})

process.on('SIGINT', function() {
  db.connection.close(function(){
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// SCHEMAS
require('./dog');
require('./user');
require('./vet');
