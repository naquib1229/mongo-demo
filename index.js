//Connecting to Mongodb
 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/playground')// connection string hard coded but in real world application it comes from configuration file
    .then(() => console.log('Connected to MongoDB...')) // if playground database not exist created playground database and connect
    .catch(err => console.error('Could not connect to MongoDB...', err));