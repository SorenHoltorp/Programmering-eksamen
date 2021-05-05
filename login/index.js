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


async function get(context, req){
    try{
        let email = req.query.email;
        let password = req.query.password;
        let user = await db.login(email, password)
        context.res = {
            body: user ({status: 'Success, login'})
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user found - ${error.message}`
        }
    }
}

async function post(context, req){
    try{
        let email = req.query.email;
        let password = req.query.password;
            await db.login(email, password)
            context.res
            .status(302)
            .set('location','http://localhost:7071/mainpage')
            .send();
    }
     catch(error){
            context.res = {
                status: 400, 
                body: error.message
            }

    }
}