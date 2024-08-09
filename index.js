
//IMPORTING DEPENDENCIES
const express = require('express');
const app = express();;
const bodyParser = require('body-parser');



//BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//FALSE DATA BASE WITH JSON
var DB = {
    games:[
        {
            id: 23,
            title: 'Call of Duty MW',
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: 'Sea of Thieves',
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: 'Minecraft',
            year: 2012,
            price: 20
        }
    ]
}



//FIRST ROUTE OR 'END-POINT'
app.get('/games', (req, res) =>{
    res.status(200);
    res.json(DB.games);
})



//ROUTE/END-POINT FOR GET 'ID' OF THE GAME
app.get('/game/:id', (req, res) =>{

    if(isNaN(req.params.id)){ //inNaN para verificar se é um número
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id); //Id sendo um texto, uso parseInt pra converter

        var game = DB.games.find((g) => {
            return g.id == id
        })

        if(game != undefined){
            res.status(200);
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
})



//OPENING SERVER
app.listen(4545, () =>{
    console.log('Server created');
})