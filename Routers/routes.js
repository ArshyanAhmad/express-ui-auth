const Router = require('express').Router()
const { signIn, signUp, userDynamicName } = require('../controllers/controller')

Router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        signIn: '/signIn',
        signUp: '/signUp'
    })
})

Router.get('/home', (req, res) => {
    if (userDynamicName.name) {
        res.render('index', {
            title: 'Home page',
            name: userDynamicName.name
        })
    }
    else {
        return res.status(200).json({
            success: false,
            message: "Page not Found",
            signIn: '/signIn',
            signUp: '/signUp'
        })
    }
})

Router.get('/signIn', (req, res) => {
    userDynamicName.name = ''
    res.render('signin', {
        title: 'Login page'
    })
})

Router.get('/signUp', (req, res) => {
    userDynamicName.name = ''
    res.render('signup', {
        title: 'Signup Page'
    })
})

Router.get('*', (req, res) => {
    userDynamicName.name = ''
    res.status(200).json({
        success: false,
        message: "Page not Found",
        signIn: '/signIn',
        signUp: '/signUp'
    })
})

Router.post('/signUp', signUp)
Router.post('/signIn', signIn)

module.exports = Router;