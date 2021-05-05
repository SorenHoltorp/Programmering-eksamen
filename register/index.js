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
                body: "Please get or post"
            };
            break
    }
}

async function get(context, req){
    try{
        let name = req.query.name;
        let user = await db.select(name)
        context.res = {
            body: user
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}

async function post(context, req){
    try{
        let payload = req.body;
        await db.insert(payload)
        

        console.log(payload)
        
        context.res = {
            body: ["succes"]
        }
    } catch(error){
        console.log("i was here")
        context.res = {
            status: 400,
            body: error.message
        }
    }
}