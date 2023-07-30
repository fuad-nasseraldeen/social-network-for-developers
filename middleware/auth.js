const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    // GET TOKEN FROM HEADER
    const token = req.header('x-auth-token')

    //Check if no token 
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    // Varify token
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'token is not valid' })
    }
}