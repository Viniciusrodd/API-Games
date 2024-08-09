
//IMPORTANDO DEPENDÊNCIAS:
const express = require('express');
const app = express();;
const bodyParser = require('body-parser');


//BODY-PARSER:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

