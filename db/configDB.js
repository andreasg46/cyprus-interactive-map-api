const { Sequelize } = require('sequelize');


module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/cyprusdb.db'  // ...and point to the DB file
});