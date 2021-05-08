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
            await getid(context, req);
            break;
        case 'PATCH':
            await patch(context, req);
            break;
        case 'PUT':
            await put(context, req);
            break;
        case 'DELETE':
            await remove(context, req);
            break;
        default:
            context.res = {
                body: "Method not accepted"
            };
            break
    }
}

async function getid(context, req){
    try{
        let usernameToken = req.headers.authentication
        let userid = await db.selectProfile(usernameToken)
        context.res = {
            body: [userid]
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}


async function patch(context, req){
    try{
        let payload = req.body

        let usernameToken = req.headers.authentication
        await db.setupProfile(payload, usernameToken)
       
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


async function remove(context, req){
    try{
        let payload = req.body
        let usernameToken = req.headers.authentication
        await db.deleteProfile(payload, usernameToken)
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

