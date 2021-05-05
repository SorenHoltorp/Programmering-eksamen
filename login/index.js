const db = require('../shared/db');
const bcrypt = require("bcryptjs");
const createProfile = require('../createProfile');

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


        console.log('user: ' + user)

        const passwordDB = user[3].value

        const passwordMatch = await bcrypt.compare(password, passwordDB)

        console.log(password)
        console.log(passwordDB)

        if(passwordMatch) {
            context.res = {
                status: 200,
                body: "Login Succes!"
            }
        } else {
            context.res = {
                body: ["Incorrect password"]
            }
        } 
        
    } catch(error) {
        context.res = {
            status: 400,
            body: error.message
        }
    }
}
