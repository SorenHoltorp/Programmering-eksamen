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
            break;
        case 'POST':
            await getLID(context, req);
            break;
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
        let likedProfileID = req.body.likedProfileID;
        let status = db.addlike(profileID, likedProfileID);

        context.res = {
            body: ["succes", profileID, likedProfileID, status]
        };
    } catch(error) {
        context.res = {
            status: 400,
            body: `${error.message}`
        };
    };
};

async function getLID(context, req){
    try{
        let profileID = req.body.profileID;
        let likedProfileID = req.body.likedProfileID;
        let likeID = await db.getLikeID(profileID, likedProfileID)
        
        console.log(likeID)
        context.res = {
            body: [likeID]
        }
    } catch(error) {
        context.res = {
            status: 400,
            body: `${error.message}`
        };
    };
};