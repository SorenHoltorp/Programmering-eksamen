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
            await getUsersAdmin(context, req);
            break;
        default:
            context.res = {
                body: "Please use get"
            };
            break
    }
}

//Get users ecxept itself
async function getUsersAdmin(context, req){
    try{
        //let emailToken = req.headers.authentication
        let userID = req.body.userID;
        let totalUsers = await db.getUsersAdmin(userID);
        context.res = {
            body: ['TotalUsers Succeded', totalUsers]
        };

    } catch(error){
        context.res = {
            status: 400,
            body: `TotalUsers failed - ${error.message}`
        };
    };
};