const isIdValid = require("../helpers/helperFunctions");
const productModel = require("../models/productModel");
const Product = require("../models/productModel");
const slugify = require("slugify");
const userModel = require("../models/userModel");
const { default: mongoose } = require("mongoose");

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
    if (req.query.page) {
      let page = req.query.page;
      const limit = parseInt(req.query.show) || 3;
      console.log(`this ${limit}`);
      const skipped = (page - 1) * limit;
      products = products.skip(skipped).limit(limit);

      let documentCount = await Product.countDocuments();
      let pagecount = documentCount / limit;
      console.log(Math.ceil(pagecount));
      if (skipped >= documentCount) {
        return res.status(404).json({ msg: "no more products" });
      }
    }

    const finalProducts = await products;
    console.log(finalProducts);
    return res.status(200).json(finalProducts);
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

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
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


//add item to wishlist
const addToWishlist = async (req, res)=> {
  const id = req.id
  const productId = req.body.id
  try {
  const findUser = await userModel.findById(id)
  console.log(findUser,id, productId, "testing this annoying bug")
  if(findUser){
    const checkWishlist = findUser.wishList.find((productID)=> productID.toString() == productId.toString())
    if(checkWishlist){
      return res.json({msg: "you have already added this item"})
    }else{
      const isaddToWishList = await userModel.findByIdAndUpdate(id, {$push: {wishList: productId}}, {new: true}).populate('wishList')
      if(isaddToWishList){
        return res.json(isaddToWishList)
      }
    }
  }
  } catch (error) {
    res.json(error.message)
  }
  
}
//remove item from wishlist
const removeFromWishlist = async (req, res)=> {
  const id = req.id
  const productId = req.body.id
  try {
  const findUser = await userModel.findById(id)
  console.log(findUser,id, productId, "testing this annoying bug")
  if(findUser){
    const checkWishlist = findUser.wishList.find((productID)=> productID.toString() == productId.toString())
    console.log(checkWishlist, "na me be this")
    if(checkWishlist){
      const isremovedFromWishList = await userModel.findByIdAndUpdate(id, {$pull: {wishList: productId}}, {new: true})
      if(isremovedFromWishList){
        return res.json(isremovedFromWishList)
      }
      
    }else{
      return res.json({msg: "product not in cart"})
    }
  }
  } catch (error) {
    res.json(error.message)
  }
  
}

module.exports = { uploadProduct, getProducts, getProduct, updateProduct, addToWishlist, removeFromWishlist };
