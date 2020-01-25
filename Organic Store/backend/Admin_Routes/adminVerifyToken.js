const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    const bearer = req.headers["authorization"]

    if (bearer) {
        const bearerToken = bearer.split(" ")
        const token = bearerToken[1]


        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            if (err) {
                res.status(400).send('Invalid Token')
            } else {
                req.admin = data
                next();
            }
        })
    }
    else {
        res.status(401).send('Access Denied')
    }

}