const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    try {
        let valid = jwt.verify(token, process.env.API_KEY)
        next()
    } catch {
        res.status(404).json({
            error: 'Unauthorzied access'
        })
    }

}