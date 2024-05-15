const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./helpers/db");
const cors = require('cors')
const authrouter = require("./routes/routers");
const gencode = require("./helpers/generateKey");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const productRouter = require("./routes/productRouters");
const blogRouter = require("./routes/blogRouters");
const productCategoryRouter = require("./routes/productCategoryRouters");
const blogCategoryRouter = require('./routes/blogCategoryRouter')
const brandRouter = require('./routes/brandRouter')
const couponRouter = require('./routes/couponRouter')
const colorRouter = require('./routes/colorRouter');
const enqRouter = require("./routes/enquiryRouter");

db(express, app, mongoose);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

app.use("/api/user", authrouter);
app.use("/api/product", productRouter);
app.use("/api/blog/", blogRouter);
app.use("/api/productCategory", productCategoryRouter);
app.use('/api/blogcategory', blogCategoryRouter)
app.use('/api/brand/', brandRouter)
app.use('/api/coupon', couponRouter)
app.use("/api/color", colorRouter)
app.use("/api/enquiry", enqRouter)
