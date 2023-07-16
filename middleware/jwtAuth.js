const JWT = require('jsonwebtoken')

const jwtAuth = async (req, res, next) => {

    const token = (req.cookies || req.cookies.token) || null

    if (!token) {
        res.status(400).json({
            success: false,
            message: "Not Authorized"
        })
    }

    try {

    } catch (error) {

    }

    next()
}
module.exports = jwtAuth;