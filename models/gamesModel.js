
const sequelize = require('sequelize');
const connection = require('../database/database');

const Games = connection.define('games',{
    title: {
        type: sequelize.STRING,
        allownull: false
    },
    year: {
        type: sequelize.NUMBER,
        allownull: false
    },
    price: {
        type: sequelize.NUMBER,
        allownull: false
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