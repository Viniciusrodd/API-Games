
//IMPORTING DEPENDENCIES
const express = require('express');
const app = express();;
const bodyParser = require('body-parser');
const sequelize = require('sequelize');


//IMPORTING MY CONNECTION AND TABLES
const connection = require('./database/connectionDB');
const gamesModel = require('./models/gamesModel');


//BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//AUTHENTICATE DATABASE CONNECTION
connection.authenticate()
    .then(() =>{
        console.log('Database is connected');
    })
    .catch((error) =>{
        console.log('Database failed in connected');        
    })



//FALSE DATA BASE WITH JSON
var DB = {
    games:[
        {
            
        }
    ]
}        


//'END-POINT' TO DISPLAY GAMES
app.get('/games', (req, res) =>{
    gamesModel.findAll()
    .then((gamesDatas) =>{
        res.status(200).json(gamesDatas);
    })
})



//END-POINT TO CREATE A GAME
app.post('/game', (req, res) =>{
    var { titleVar, yearVar, priceVar } = req.body; //Usando destructuring

    // Validação do título
    if (typeof titleVar !== 'string' || titleVar.trim() === '') { 
        //.trim() para não deixar espaço no começo e final de string, tipo: ' aaa '
        //typeof para comparar o tipo da variavel
        return res.status(400).send({ error: "Invalid title" });
    }

    // Validação do ano
    if (typeof yearVar !== 'number' || isNaN(yearVar)) {
        return res.status(400).send({ error: "Invalid year" });
    }

    // Validação do preço
    if (typeof priceVar !== 'number' || isNaN(priceVar)) {
        return res.status(400).send({ error: "Invalid price" });
    }

    gamesModel.create({
        title: titleVar,
        year: yearVar,
        price: priceVar
    })
    .then(() =>{
        return res.status(201).send('New data created');
    })
    .catch((error) =>{
        return res.status(500).send('Error in created new data');
    })

    DB.games.push({
        title: titleVar,
        year: yearVar,
        price: priceVar
    });

})



//END-POINT FOR GET A GAME BY ID
app.get('/game/:id', (req, res) =>{

    if(isNaN(req.params.id)){ //inNaN para verificar se é um número
        res.sendStatus(400);
    }else{
        var idVar = parseInt(req.params.id); //Id sendo um texto, uso parseInt pra converter

        gamesModel.findByPk(idVar)
        .then((gameData) =>{
            if(gameData != undefined){
                res.json(gameData);
            }
            else{
                res.status(400).send('Bad request');
            }
        })
    }
})



//DELETE GAMES END-POINT
app.delete('/game/:id', (req, res) =>{
    if(isNaN(req.params.id)){ //inNaN para verificar se é um número
        return res.status(404).send('You need to put a Number in URL');
    }else{
        var idVar = parseInt(req.params.id);
        
        if(idVar <= 0){
            return res.status(404).send('You need to put a number bigger than zero');
        }else{
            gamesModel.destroy({
                where: {
                    id: idVar
                }
            })
            .then(() =>{
                var index = DB.games.findIndex((g) =>{
                    return g.id === idVar;
                })
                
                DB.games.splice(index, 1);
                return res.status(200).send(`The game with ID: ${idVar} has been deleted`)    
            })
        }

    }  
})



//UPDATE GAME END-POINT
app.put('/game/:id', (req, res) =>{
    var idVar = parseInt(req.params.id);

    var game = DB.games.find((g) =>{
        return g.id === idVar;
    })

    if(game != undefined){
        var {title, year, price} = req.body; //Usando destructuring
       
        if(title != undefined){
            game.title = title;
        }
        if(year != undefined){
            game.year = year;
        }
        if(price != undefined){
            game.price = price;
        }

        res.status(200).send('Game updated');
    }else{
        return res.status(404).send('The game is undefined');
    }

})




//OPENING SERVER
app.listen(4545, () =>{
    console.log('Server created');
})