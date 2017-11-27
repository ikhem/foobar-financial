const mongoose = require('mongoose');
const keys     = require('../config/keys');
const dbURI    = keys.mongoURI;

// Setup production database
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

// Disable promise deprecation warning
mongoose.Promise = global.Promise;

// Mongo connection
mongoose.connect(dbURI, { useMongoClient: true });

// Connection Events
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// Capture app termination/restart events

// Helper function for processing restarts or terminations
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
      console.log('Mongoose disconnected through ' + msg);
      callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
      process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
      process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
      process.exit(0);
  });
});

// Bring in schema & models
require('./transactions');
require('./accounts');
require('./user');