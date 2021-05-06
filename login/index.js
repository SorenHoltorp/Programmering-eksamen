const db = require('../shared/db');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const setupProfile = require('../setupProfile');

const privateKey = 'secret-key';

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')
    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}


// two-factor authentication


async function post(context, req){
    try{

        let email = req.body.email
        let password = req.body.password
        let user = await db.login(email)
        const passwordDB = user[3].value

        //JWT token
        let token = jwt.sign(email, privateKey, { algorithm: 'HS256' });
        console.log("the token is: " + token)

        if(passwordDB === password) {
            context.res = {
                status: 200,
                body: ["Correct password", token]
            }
        } else {
            context.res = {
                body: ["Incorrect password"]
            }
        } 
        
    } catch(error) {
        console.log("error in login.", error)
        context.res = {
            status: 400,
            body: error.message
        }
    }
}
