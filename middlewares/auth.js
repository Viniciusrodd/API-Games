
//Criando middleware como camada de PROTEÇÃO a minha API
const jwt = require('jsonwebtoken');
const JWTsecret = '123455432112345'

function Auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        //separando a parte de 'Bearer' do 'tokien' em si: 
        /*  
            Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJpZCI6MSwiZW1haWwiOiJ2aW5pY2l1c3VzZXIyMkBnb
            WFpbC5jb20iLCJpYXQiOjE3MjU0NjA5NTQsImV4cCI6MTcyNTYzMzc1NH0.
            S-OfXwvpCI_rfb3rbuQGyVEBxr0E8kak02PJgumiUOs'
        */
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