
const Sequelize = require('sequelize');
const connection = require('../database/connectionDB');

const Games = connection.define('games',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Games.sync({force: false})
    .then(() =>{
        console.log('Games table created');
    })
    .catch((error) =>{
        console.log('Games table create failed');        
    })

module.exports = Games;