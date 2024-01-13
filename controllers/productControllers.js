const isIdValid = require("../helpers/helperFunctions");
const Product = require("../models/productModel");
const slugify = require("slugify");

//Upload Product
const uploadProduct = async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const dataObj = req.body;
  console.log(dataObj);
  try {
    const product = new Product(dataObj);
    const savedData = await product.save();
    console.log(savedData);
    res.status(200).json(dataObj);
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  console.log(req.query);
  let objQuery = { ...req.query };
  const filter = ["page", "fields", "sort", "page"];

  filter.forEach((el) => delete objQuery[el]);
  objQuery = JSON.stringify(objQuery);

  objQuery = objQuery.replace(
    /\b(lt|lte|gte|et|gt)\b/g,
    (match) => `$${match}`
  );
  let products = Product.find(JSON.parse(objQuery));
  if (products) {
    let sortQuery;
    let fieldsquery;
    if (req.query.sort) {
      sortQuery = req.query.sort.split(",").join(" ");
      products = products.sort(sortQuery.sort);
    } else {
      products = products.sort("-createdAt");
    }
    if (req.query.fields) {
      let selectFields = req.query.fields.split(",").join(" ");
      console.log(` this is me ${selectFields}`);
      products = products.select(`${selectFields}`);
    } else {
      products = products.select("-__v");
    }
    if(req.query.page){
      let page = req.query.page
      const limit = parseInt(req.query.show) || 3
      console.log(`this ${limit}`)
      const skipped = (page - 1) * limit
      products = products.skip(skipped).limit(limit)
    }

    const finalProducts = await products;
    console.log(finalProducts)
    res.status(200).json(finalProducts);
  }
};

const getProduct = async (req, res) => {
  const { id } = req?.params;
  isIdValid(id);
  try {
    const item = await Product.findById(id);
    if (item) {
      res.status(200).json(item);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { title: title, description: description },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
      console.log(updatedProduct);
    } else {
      console.log(updatedProduct);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadProduct, getProducts, getProduct, updateProduct };
