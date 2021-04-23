const express = require('express');
const app = express();
const port = 7071; 
const cors = require ('cors');
const bodyParser = require ("body-parser")
const port = 7071;
const cors = require('cors');
const bodyparser = require('bodyparser');

// BODY-PARSER
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* - Kommer til at være noget vi skal bruge
const signupRoute = require ("./controller/signupAPI")
const loginRoute = require ("./controller/loginAPI")
*/

//CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Gitlaid homepage</h1>")
});

// REGISTER CONTROLLER + POST
const registerController = require('./API/Controllers/LoginController/registerController');
app.post("/api/createUser/register", registerController);

/* -Kommer til at være noget vi skal bruge
app.use("/signup", signupRoute);
app.use("/", loginRoute )
*/

<<<<<<< HEAD

=======
>>>>>>> 97475a770e3da761c00bc1db5f557c561a72a46d
app.listen(port, () => {
    console.log(`Server-applikation lytter på http://localhost:${port}`)
});
