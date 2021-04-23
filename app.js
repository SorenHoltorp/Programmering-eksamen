const express = require ('express');
const app = express();
const port = 9000; 


app.get("/",(req,res)=>{
    res.send("<h1>Gitlaid homepage</h1>")
});

app.listen(port, () => {
    console.log(`Server-applikation lytter på http://localhost:${port}`)
});