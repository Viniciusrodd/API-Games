
//IMPORTING DEPENDENCIES
const express = require('express');
const app = express();;
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const axios = require('axios'); //biblioteca js para consumir APIs
const cors = require('cors'); //politica de segurança necessária para consumo de APIs
const jwt = require('jsonwebtoken'); //autenticação pra users de APIs
const authMiddleware = require('./middlewares/auth');



//CREATING A SECRET KEY FOR JWT
const JWTsecret = '123455432112345'


//SETTING A PUBLIC FILE AS A EXPRESS STATIC
app.use(express.static('public'));


//SETTING A EJS VIEW-ENGINE
app.set('view engine', 'ejs');


//Using CORS for consuming a API
app.use(cors());


//IMPORTING MY CONNECTION AND TABLES
const connection = require('./database/connectionDB');
const gamesModel = require('./models/gamesModel');
const usersModel = require('./models/usersModel');


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

    
//END-POINT TO RENDER A 'paginaApi'
app.get('/paginaApi', (req, res) =>{
    res.render('paginaApi')
})



//END-POINT TO LOGIN PAGE
app.get('/paginaAutenticacao', (req, res) =>{
    res.render('paginaAutenticacao');
})



//END-POINT TO RENDER A 'pagianCadastro'
app.get('/paginaCadastro', (req, res) =>{
    res.render('paginaCadastro')
})



//'END-POINT' TO DISPLAY GAMES
app.get('/games', authMiddleware, (req, res) =>{
    gamesModel.findAll()
    .then((gamesDatas) =>{

        let gamesWithHATEOAS = gamesDatas.map((game) =>{
            return {
                ...game.dataValues, //...Operador Spread
                _links: [
                    {
                        href: 'http://localhost:4545/game/id',
                        method: 'DELETE',
                        rel: 'delete_game'
                    },
                    {
                        href: 'http://localhost:4545/games',
                        method: 'GET',
                        rel: 'get_game'
                    },
                    {
                        href: 'http://localhost:4545/game/id',
                        method: 'PUT',
                        rel: 'put_game'
                    },
                    {
                        href: 'http://localhost:4545/game',
                        method: 'POST',
                        rel: 'post_game'
                    }        
                ]
            }
        })
        /*
            .map pegando cada dado de game do meu para me
            retornar apenas o dataValue daqueles dados + meu array de objetos _links
         */
        res.status(200).json(
            gamesWithHATEOAS
        );
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

})



//END-POINT FOR GET A GAME BY ID
app.get('/game/:id', (req, res) =>{

    if(isNaN(req.params.id)){ //inNaN para verificar se é um número
        res.sendStatus(400);
    }else{
        var idVar = parseInt(req.params.id); //Id sendo um texto, uso parseInt pra converter

        var _links = [
            {
                href: `http://localhost:4545/game/${idVar}`,
                method: 'DELETE',
                rel: 'delete_game'
            },
            {
                href: `http://localhost:4545/games/${idVar}`,
                method: 'GET',
                rel: 'get_game'
            },
            {
                href: `http://localhost:4545/game/${idVar}`,
                method: 'PUT',
                rel: 'put_game'
            },
            {
                href: `http://localhost:4545/game/${idVar}`,
                method: 'POST',
                rel: 'post_game'
            }        
        ]

        gamesModel.findByPk(idVar)
        .then((gameData) =>{
            if(gameData != undefined){
                res.json({gameData, _links});
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
                return res.status(200).send(`The game with ID: ${idVar} has been deleted`)    
            })
        }

    }  
})



//UPDATE GAME END-POINT
app.put('/game/:id', (req, res) =>{
    var idVar = parseInt(req.params.id);
    var {titleVar, yearVar, priceVar} = req.body;

    if(titleVar != undefined && yearVar != undefined && priceVar != undefined){
        gamesModel.update({
            title: titleVar,
            year: yearVar,
            price: priceVar
        }, {
            where: {
                id: idVar
            }
        })
        .then(() =>{
            return res.status(200).send('Game updated successfully');
        })
        .catch((error) =>{
            return res.status(400).send('Bad ID request');
        })     
    }else{
        return res.status(400).send('Bad request, the fields are empty'); 
    }   
})



//END-POINT FOR REGISTER USER CREATE
app.post('/user', (req, res) =>{
    var nameVar = req.body.name;
    var emailVar = req.body.email;
    var passwordVar = req.body.password;

    usersModel.create({
        name: nameVar,
        email: emailVar,
        password: passwordVar
    })
    .then(() =>{
        res.redirect('/paginaAutenticacao')
    })
    .catch((error) =>{
        return res.status(404).send('Not found');
    })
})



//END-POINT TO AUTHENTICATE A USER FOR ACESS API
app.post('/auth', (req, res) =>{
    var emailVar = req.body.email;
    var passwordVar = req.body.password;

    usersModel.findOne({
        where: {
            email: emailVar
        }
    })
    .then((authData) =>{
        if(authData.password == passwordVar){

            //PAYLOAD (informações passadas para dentro do token):
            jwt.sign({id: authData.id, email: authData.email}, JWTsecret, {expiresIn:'48h'}, (erro, token) =>{
                if(erro){
                    return res.status(400).send('Bad request, authentication failed');
                }else{
                    return res.status(200).json({
                        token: token
                    });
                }
            })
        }else{
            return res.status(401).send('Não autorizado, credenciais(senha) erradas');
        }
    })
    .catch((error) =>{
        return res.status(401).send('Não autorizado, credenciais(email) erradas');
    })
})


//OPENING SERVER
app.listen(4545, () =>{
    console.log('Server created');
})