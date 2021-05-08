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
        default:
            context.res = {
                body: "Method not accepted"
            };
            break
    }
}

async function get(context, req){
    try{
        let users_id = req.query.users_id;
        let profile = await db.selectProfile(users_id)
        console.log(profile)
        context.res = {
            body: profile,
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `Cant fint user infromation - ${error.message}`
        }
    }
}