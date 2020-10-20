const jwt = require('jsonwebtoken')

module.exports = function generateToken(user) {
    const jwtPayload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const jwtSecret = require('./secret.js').jwtSecret

    const jwtOptions = {
        expiresIn: "48h"
    }
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}