const db = require('../shared/db');
const requireLogin = require('../middleware/Jwt')

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
            break;
        case 'PUT':
            await put(context, req);
            break;
        default:
            context.res = {
                body: "Method not accepted"
            };
            break
    }
}

async function get(context, req){
    try{
        let email = req.body.email;
        let user = await db.selectProfile(email)
        console.log(user)
        context.res = {
            body: ["user"]
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}

async function put(context, req){
    try{
        let payload = req.body
        await db.setupProfile(payload)
        console.log(payload)
       
        context.res = {
            body: ["succes"]
        }
    } catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}