const db = require('../shared/db');

<<<<<<< HEAD
    context.res = {
        body: responseMessage
    };
}
=======
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
        case "PUT":
            await put(context, req);
            break;
        default:
            context.res = {
                body: "Method not accepted"
            };
            break
    }
}
>>>>>>> d81b34f003327b1f236bf0671e3f7205ac9d27f9
