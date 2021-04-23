function registerController(req, res) {
    console.log("Server received request.")
    try {

        const newUser = ({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        console.log("Just added " + newUser)

        // Roseneagle gør noget fedt her. newUser skal sendes til databasen, og vi skal have et respons fra databasen om, at alt er fjong
        let succes = "It worked!";
        res.json(succes)
    } 
    catch(err){
        let failed = "It failed"; 
        console.log(err)
        res.send(failed)
    }

}
module.exports = registerController;