const jwt = require('jsonwebtoken')

function createToken(data){
    let token = jwt.sign(data,'secret-key',{expiresIn:'24h'})

    return token;
} 

module.exports ={
    createToken
}