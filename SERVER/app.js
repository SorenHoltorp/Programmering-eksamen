const express = require('express');
const app = express();
const port = 7071;
const cors = require('cors');
const bodyparser = require('bodyparser');

// BODY-PARSER
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());


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

app.listen(port, () => {
    console.log(`Server-applikation lytter på http://localhost:${port}`)
});
