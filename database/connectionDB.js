
const sequelize = require('sequelize');

const connection = new sequelize('games-API', 'root', 'bravogamessempre123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection;
