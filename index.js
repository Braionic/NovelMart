const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const db = require('./helpers/db')
const router = require('./routes/routers')
const gencode = require('./helpers/generateKey')

db(express, app, mongoose)
gencode()
app.use(express.json())

app.use('/api/user', router)


