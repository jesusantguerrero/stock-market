const mongoose = require('mongoose');

mongoose.connect(process.env.DB_STRING_CONNECTION)

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind('database couldn´t connect'));
db.once('open',(e) => {
  console.log(`connected to mongodb in ${process.env.DB_STRING_CONNECTION}`);
});


module.exports = db;