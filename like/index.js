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
            await getid(context, req);
            break;
        case 'PATCH':
            await patchLike(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

//Get the ID from the Database based on the token.
async function getid(context, req){
    try{
        let userID = req.body.userID
        let profileID = await db.getProfileID(userID)
        context.res = {
            body: [profileID]
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No profile - ${error.message}`
        };
    };
};

async function patchLike(context, req){
    try{
        let profileID = req.body.profileID;
        let likedUserID = req.body.likedUserID;
        let status = db.addlike(profileID, likedUserID);
        console.log("the status on like function is: " + status)
        context.res = {
            body: ["succes", status]
        };
    } catch(error) {
        context.res = {
            status: 400,
            body: `${error.message}`
        };
    };
};