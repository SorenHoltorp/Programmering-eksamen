const db = require('../shared/db');

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
                body: "Method not accepted"
            };
            break
    }
}

// funktionen for get er ikke lavet endnu. Men vejen virker.
async function get(context, req){
    try{
        console.log("I got a get request for createProfile")
        console.log(req.body)
        context.res = {
            body: ["sucess"]
        }
    } catch(error){
        context.res = {
            status: 400,
            body: `Create profile failed - ${error.message}`
        }
    }
}

// funktionen for post er ikke lavet endnu. Men vejen virker.
async function post(context, req){
    try{
        console.log("I got a post request for createProfile")
        console.log(req.body)
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