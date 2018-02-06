const mongoose = require('mongoose');

mongoose.createConnection(process.env.DB_STRING_CONNECTION, {
  useMongoClient: true
})

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => console.log('database couldn´t connect'));

module.exports = db;