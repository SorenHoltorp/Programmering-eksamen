const express = require ('express');
const app = express();
const port = 9000; 
const cors = require ('cors');


/* - Kommer til at være noget vi skal bruge
const signupRoute = require ("./controller/signupAPI")
const loginRoute = require ("./controller/loginAPI")
*/

//FKING CORS
app.use(cors());

app.get("/",(req,res)=>{
    res.send("<h1>Gitlaid homepage</h1>")
});

// REGISTER CONTROLLER + POST
const registerController = require ('./API/Controllers/LoginController/registerController');
app.post("/register", registerController);

/* -Kommer til at være noget vi skal bruge
app.use("/signup", signupRoute);
app.use("/", loginRoute )
*/

// Alt den her kode gør, at man kan sende req til single-view applikations igennem cors
app.use((req, res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
if (req.method === "OPTIONS") {
    res.header ("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});  
    }
    next();
});


app.listen(port, () => {
    console.log(`Server-applikation lytter på http://localhost:${port}`)
});
