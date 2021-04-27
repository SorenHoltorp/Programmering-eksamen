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


// two-factor authentication
/*
async function get(context, req){
    try{
        let email = req.query.email;
        let password = req.query.password;
        let user = await db.login(email,password)
        context.res = {
            body: user ({status: 'Success'})
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user found - ${error.message}`
        }
    }
}
*/