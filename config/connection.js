const {connect, connection} = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:P5nMvrDA6J5XT7ox@uta-bootcamp-01.dwuw1sk.mongodb.net/';

connect(connectionString);

module.exports = connection;