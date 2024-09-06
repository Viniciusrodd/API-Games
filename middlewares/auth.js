
//Criando middleware como camada de PROTEÇÃO a minha API
const jwt = require('jsonwebtoken');
const JWTsecret = '123455432112345'

function Auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        //separando a parte de 'Bearer' do 'tokien' em si: 
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWTsecret, (error, data) =>{
            if(error){
                res.status(401).send('Token inválido');
            }else{
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                }
                next()
            }
        })

    }else{
        res.status(401).send('Token inválido');
    }
}

module.exports = Auth;