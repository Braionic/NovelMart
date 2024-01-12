const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const db = require('./helpers/db')
const authrouter = require('./routes/routers')
const gencode = require('./helpers/generateKey')
const cookieParser = require('cookie-parser')
const productRouter = require('./routes/productRouters')


db(express, app, mongoose)
app.use(cookieParser())
app.use(express.json())

app.use('/api/user', authrouter)
app.use('/api/product', productRouter)


