const Router = require('express').Router()
const { signIn, signUp, userDynamicName } = require('../controllers/controller')

Router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        signIn: '/signIn',
        signUp: '/sighUp'
    })
})

if (userDynamicName.name !== '') {
    Router.get('/home', (req, res) => {
        const userName = req.query.name;
        console.log('username', userName);
        res.render('index', {
            title: 'Home page',
            name: userDynamicName.name
        })
    })
}

Router.get('/signIn', (req, res) => {
    res.render('signin', {
        title: 'Login page'
    })
})

Router.get('/signUp', (req, res) => {
    res.render('signup', {
        title: 'Signup Page'
    })
})

Router.get('*', (req, res) => {
    res.status(200).json({
        success: false,
        message: "Page not Found"
    })
})

Router.post('/signUp', signUp)
Router.post('/signIn', signIn)

module.exports = Router;