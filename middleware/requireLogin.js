const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys')

module.exports = (req, res, next) => {
    user = req.body
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error: 'You must be logged in'})
    }
    // her laves den JWT, der bliver givet til User, når de 
    // bliver registreret
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
            res.status(401).json({error:'You must be logged in'})
        }

        const {_id} = payload
        user.findById(_id).then(userdata => {
            req.user = userdata 
            next()
        })
    }) 
}