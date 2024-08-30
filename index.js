
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



//CADASTRANDO DADOS NA API
app.post('/game', (req, res) =>{
    var { title, year, price } = req.body; // Usando destructuring

    // Validação do título
    if (typeof title !== 'string' || title.trim() === '') { 
        //.trim() para não deixar espaço no começo e final de string, tipo: ' aaa '
        //typeof para comparar o tipo da variavel
        return res.status(400).send({ error: "Invalid title" });
    }

    // Validação do ano
    if (typeof year !== 'number' || isNaN(year)) {
        return res.status(400).send({ error: "Invalid year" });
    }

    // Validação do preço
    if (typeof price !== 'number' || isNaN(price)) {
        return res.status(400).send({ error: "Invalid price" });
    }

    // Se todas as validações passarem, continue com a lógica de cadastro
    DB.games.push({
        id: 2424,
        title,
        year,
        price
    });

    res.status(201).send({ message: "Game successfully created" });
})



//DELETE GAMES END-POINT
//By 'delete HTTP route'
app.delete('/game/:id', (req, res) =>{
    if(isNaN(req.params.id)){ //inNaN para verificar se é um número
        return res.status(404).send('You need to put a Number in URL');
    }else{
        var idVar = parseInt(req.params.id);
        var index = DB.games.findIndex((g) =>{
            return g.id === idVar;
        })

        if(index === -1){ //Verifica se o ID existe
            return res.status(404).send('This game ID does not exist');            
        }
        
        if(idVar <= 0){
            return res.status(404).send('You need to put a number bigger than zero');
        }else{
            DB.games.splice(index, 1);
            return res.status(200).send(`The game with ID: ${idVar} has been deleted`)
        }

    }  
})



//OPENING SERVER
app.listen(4545, () =>{
    console.log('Server created');
})