const isIdValid = require("../helpers/helperFunctions");
const Product = require("../models/productModel");
const slugify = require("slugify");
const userModel = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const productModel = require("../models/productModel");

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
//Get all products
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
const addToWishlist = async (req, res) => {
  const id = req.id;
  const productId = req.body.id;
  try {
    const findUser = await userModel.findById(id);

    if (findUser) {
      const checkWishlist = findUser.wishList.find(
        (productID) => productID.toString() == productId.toString()
      );
      if (checkWishlist) {
        const removeDitem = await userModel.findByIdAndUpdate(
          id,
          { $pull: { wishList: checkWishlist } },
          { new: true }
        );
        if (removeDitem) {
          return res.json(removeDitem);
        }
        //return res.json({ msg: "you have already added this item" });
      } else {
        const isaddToWishList = await userModel
          .findByIdAndUpdate(
            id,
            { $push: { wishList: productId } },
            { new: true }
          )
          .populate("wishList");
        if (isaddToWishList) {
          return res.json(isaddToWishList);
        }
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};
//remove item from wishlist
const removeFromWishlist = async (req, res) => {
  const id = req.id;
  const productId = req.body.id;
  try {
    const findUser = await userModel.findById(id);
    if (findUser) {
      const checkWishlist = findUser.wishList.find(
        (productID) => productID.toString() == productId.toString()
      );
      if (checkWishlist) {
        const isremovedFromWishList = await userModel.findByIdAndUpdate(
          id,
          { $pull: { wishList: productId } },
          { new: true }
        );
        if (isremovedFromWishList) {
          return res.json(isremovedFromWishList);
        }
      } else {
        return res.json({ msg: "product not in cart" });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

const addToCart = async (req, res) => {
  const id = req.id;
  const productId = req.body?.id;
  try {
    const findUser = await userModel.findById(id);
    if (findUser) {
      const checkCart = findUser.cart.find(
        (productID) => productID.toString() == productId.toString()
      );
      console.log(checkCart);
      if (checkCart) {
        const newCart = await userModel
          .findByIdAndUpdate(id, { $pull: { cart: productId } }, { new: true })
          .populate("cart");
        if (newCart) {
          return res.json(newCart);
        }
      } else {
        const addToCart = await userModel
          .findByIdAndUpdate(id, { $push: { cart: productId } }, { new: true })
          .populate("cart");
        if (addToCart) {
          return res.json(addToCart);
        }
      }
    }
  } catch (error) {
    return res.json(error.message);
  }
};

const rateProduct = async (req, res) => {
  const { star, comment, userId, productId } = req.body;

  try {
    const findProduct = await productModel.findById(productId);
    if (findProduct) {
      console.log(findProduct, "this is product");
      const checkForRating = findProduct.ratings.find(
        (pid) => pid.postedBy.toString() === userId.toString()
      );
      if (checkForRating) {
        const updaterating = await productModel.updateOne(
          { ratings: { $elemMatch: checkForRating } },
          { $set: { "ratings.$.stars": star } },
          { new: true }
        );
        res.json(updaterating);
      } else {
        const postRating = await productModel.findByIdAndUpdate(
          productId,
          {
            $push: {
              ratings: { stars: star, comment: comment, postedBy: userId },
            },
          },
          { new: true }
        );
        console.log(postRating);
        if (postRating) {
          res.json(postRating);
        }
      }
      const numOfRatings = findProduct.ratings.length;
      const totalRatings = findProduct.ratings.map((item)=> item.stars)
      const SumTotalRating = totalRatings.reduce((prev, curr)=> prev+curr);
      const actualRating = SumTotalRating/numOfRatings
      const toPrecision = actualRating.toPrecision(2)
      findProduct.actualRating = toPrecision
      const ratingSaved = await findProduct.save()
      console.log(ratingSaved)
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  uploadProduct,
  getProducts,
  getProduct,
  updateProduct,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  rateProduct,
};
