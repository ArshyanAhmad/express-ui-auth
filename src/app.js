require('dotenv').config()
const express = require('express')
const app = express('express')
const cookieParser = require('cookie-parser')
const Router = require('../Routers/routes')
const connectToDatabase = require('../config/db')

app.set('view engine', 'ejs')

connectToDatabase()

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(Router)

module.exports = app;