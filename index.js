const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const db = require('./helpers/db')
const router = require('./routes/routers')
const gencode = require('./helpers/generateKey')
const cookieParser = require('cookie-parser')

db(express, app, mongoose)
app.use(cookieParser())
app.use(express.json())

app.use('/api/user', router)


