const Product = require("../models/productModel");
const slugify = require('slugify')


//Upload Product
const uploadProduct = async (req, res) => {
    req.body.slug = slugify(req.body.title)
  const dataObj = req.body
  console.log(dataObj)
  try {
    const product = new Product(dataObj);
    const savedData = await product.save();
    console.log(savedData);
    res.status(200).json(dataObj)
  } catch (error) {
    console.log(error);
  }
};

const getProducts = (req, res)=>{
    console.log('hello world')
}



module.exports = {uploadProduct, getProducts}
