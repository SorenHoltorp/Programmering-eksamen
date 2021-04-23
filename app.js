const express = require ('express');
const app = express();
const port = 9000; 

/* - Kommer til at være noget vi skal bruge
const signupRoute = require ("./controller/signupAPI")
const loginRoute = require ("./controller/loginAPI")
*/

app.get("/",(req,res)=>{
    res.send("<h1>Gitlaid homepage</h1>")
});

/* -Kommer til at være noget vi skal bruge
app.use("/signup", signupRoute);
app.use("/", loginRoute )
*/

app.listen(port, () => {
    console.log(`Server-applikation lytter på http://localhost:${port}`)
});
