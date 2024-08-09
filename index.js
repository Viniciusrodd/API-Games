
//IMPORTANDO DEPENDÊNCIAS:
const express = require('express');
const app = express();;
const bodyParser = require('body-parser');


//BODY-PARSER:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//BANCO DE DADOS FALSE:
var BD = {
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




//ABRINDO SERVER:
app.listen(4545, () =>{
    console.log('Server created');
})