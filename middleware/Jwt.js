const jwt = require('jsonwebtoken');

//JWT-token safe
const privateKey = 'secret-key';

function safeJWT(input) {
    let token = input;
    let result;
    result = jwt.verify(token, privateKey, { algorithm: 'HS256' }, (err, decoded) => {
        if (err) {
            console.log('jwt decoding error')
        } else {
            return decoded
        }
    })
    console.log("i just decoded this: " + result)
    return result;
};

module.exports = safeJWT;