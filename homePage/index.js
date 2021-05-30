const db = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')
    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    
    switch (req.method) {
        case 'PUT':
            await getProfile(context, req);
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

async function getProfile(context, req){
    try{
        let userID = req.body.userID;
        let profile = await db.selectProfile(userID)
        let profileInArr = [];
        profileInArr.push(profile)
        context.res = {
            body: ["succes", profileInArr]
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `Cant fint user infromation - ${error.message}`
        }
    }
}