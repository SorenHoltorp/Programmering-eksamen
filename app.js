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

app.post("/register", registerController);

/* -Kommer til at være noget vi skal bruge
app.use("/signup", signupRoute);
app.use("/", loginRoute )
*/

app.listen(port, () => {
    console.log(`Server-applikation lytter på http://localhost:${port}`)
});
