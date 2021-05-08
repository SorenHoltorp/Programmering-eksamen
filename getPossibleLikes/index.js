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
            await getPossibleLikes(context, req);
            break;
        default:
            context.res = {
                body: "Please use get"
            };
            break
    }
}

//Get users ecxept itself
async function getPossibleLikes(context, req){
    try{
        //let emailToken = req.headers.authentication
        let profileID = req.body.profileID;
        let possibleLikes = await db.getPossibleLikes(profileID);

        


        context.res = {
            body: [possibleLikes]
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No profile - ${error.message}`
        };
    };
};