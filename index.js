const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const db = require('./helpers/db')
const authrouter = require('./routes/routers')
const gencode = require('./helpers/generateKey')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const productRouter = require('./routes/productRouters')
const blogRouter = require('./routes/blogRouters')


db(express, app, mongoose)
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/user', authrouter)
app.use('/api/product', productRouter)
app.use('/api/blog/', blogRouter)


