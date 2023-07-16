const validator = require('email-validator')
const userModel = require('../models/models')

const messageTemplate = {
    success: false,
    message: '',
    data: null
}

const userDynamicName = {
    name: '',
}

const signUp = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username, !email, !password, !confirmPassword) {
        messageTemplate.success = false
        messageTemplate.message = 'All fields are required'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

    if (password !== confirmPassword) {
        messageTemplate.success = false
        messageTemplate.message = 'Password didn"t matched'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

    const validEmail = validator.validate(email)

    if (!validEmail) {
        messageTemplate.success = false
        messageTemplate.message = 'Please enter a valid email address'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

    try {
        const userInfo = userModel(req.body)
        const result = await userInfo.save();

        /*
            // messageTemplate.success = true
            // messageTemplate.message = 'Sign up successfully'
            // messageTemplate.data = result

            // res.status(200).json(messageTemplate)
        */

        res.redirect('/signIn')

    } catch (error) {
        if (error.code === 11000) {
            messageTemplate.success = false
            messageTemplate.message = 'User already exits'
            messageTemplate.data = null

            return res.status(400).json(messageTemplate)
        }

        messageTemplate.success = false
        messageTemplate.message = 'Error while saving the data'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        messageTemplate.success = false
        messageTemplate.message = 'All fields are mendatory'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

    const user = await userModel.findOne({ email }).select('+password')

    if (!user || user.password !== password) {
        messageTemplate.success = false
        messageTemplate.message = 'Email or Password didn"t matched'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

    try {

        const token = user.jwtToken()
        const userName = user.username;
        userDynamicName.name = userName

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie('token', token, cookieOption)

        /*
            messageTemplate.success = true
            messageTemplate.message = 'Signin successfully'
            messageTemplate.data = user
        */

        res.redirect(`/home`)

    } catch (error) {
        messageTemplate.success = false
        messageTemplate.message = 'Sign In failed'
        messageTemplate.data = null

        return res.status(400).json(messageTemplate)
    }

}

module.exports = {
    signUp,
    signIn,
    userDynamicName
}   