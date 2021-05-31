const db = require('../shared/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')
    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }

    switch (req.method) {
        case 'PATCH':
            await insertMatch(context, req);
            break;
        case 'POST':
            await compareLike(context, req);
            break;
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

//Get the ID from the Database based on the token.
async function compareLike(context, req) {
    try {
        let likeID = req.body.likeID
        let profileID = req.body.profileID
        let likedProfileID = req.body.likedProfileID


        console.log("pID: " + profileID);
        console.log("lpID: " + likedProfileID);
        console.log("lID: " + likeID);

        let result = await db.comparingLikes(profileID, likedProfileID, likeID)

        context.res = {
            body: [result]
        };
    } catch (error) {
        context.res = {
            status: 400,
            body: `No match - ${error.message}`
        };
    };
};

async function insertMatch(context, req) {
    
    console.log("Starting")
    try {
        let firstLikeID = req.body.firstLikeID
        let secondLikeID = req.body.secondLikeID

        let matchID = await db.insertMatch(firstLikeID, secondLikeID)
        
        let result = {
            status: "succes",
            matchID: matchID
        }

        context.res = {
            body: [result]
        };
        
    } catch (error) {
        
        context.res = {
            status: 400,
            body: `No match - ${error.message}`
        };
    };
};