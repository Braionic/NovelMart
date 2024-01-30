const isIdValid = require("../helpers/helperFunctions");
const fs = require("fs");
const Product = require("../models/productModel");
const slugify = require("slugify");
const userModel = require("../models/userModel");
const { default: mongoose } = require("mongoose");
const productModel = require("../models/productModel");
const uploadImage = require("../helpers/cloudinary");
const cartModel = require("../models/cartModel");
const CouponModel = require("../models/couponModels");

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

//add product to cart
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
//rate product
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
      const totalRatings = findProduct.ratings.map((item) => item.stars);
      const SumTotalRating = totalRatings.reduce((prev, curr) => prev + curr);
      const actualRating = SumTotalRating / numOfRatings;
      const toPrecision = actualRating.toPrecision(2);
      findProduct.actualRating = toPrecision;
      const ratingSaved = await findProduct.save();
      console.log(ratingSaved);
    }
  } catch (error) {
    console.log(error.message);
  }
};
//upload product images
const uploadProductImage = async (req, res) => {
  try {
    const uploader = (path) => uploadImage(path, "images");
    const files = req.files;
    const productId = req.params.id;
    const url = [];
    for (const file of files) {
      const imageUrl = await uploader(file.path);
      url.push(imageUrl);
      fs.unlinkSync(file.path);
    }
    console.log(url, "urlllllll");
    const uploadimage = await productModel.findByIdAndUpdate(
      productId,
      { imageURL: url.map((uri) => uri) },
      { new: true }
    );
    if (uploadimage) {
      res.json(uploadimage);
    }
  } catch (error) {
    res.json(error.message);
  }
};

// createCart
const createCart = async (req, res) => {
  const id = req.id;
  const cart = req.body.cart;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.json("no user was found");
    }
    const checkCart = await cartModel.findOne({ orderBy: user._id });
    console.log(checkCart);
    if (checkCart) {
      checkCart.remove();
    }
    const products = [];
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = new mongoose.Types.ObjectId(cart[i].id);
      object.count = cart[i].count;
      object.color = cart[i].color;
      const productPrice = await productModel
        .findById(cart[i].id)
        .select("price")
        .exec();
      console.log(productPrice.price);
      object.price = productPrice.price;
      products.push(object);
    }
    const orderBy = new mongoose.Types.ObjectId(id);
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
      total = total + products[i].price * products[i].count;
    }
    const saveCart = new cartModel({
      products: products,
      subTotal: total,
      orderBy: orderBy,
    });
    const cartsave = await (await saveCart.save()).populate("products");
    if (cartsave) {
      res.json(cartsave);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getUserCart = async (req, res) => {
  console.log(req.id);
  try {
    const getItems = await cartModel
      .findOne({ orderBy: req.id })
      .populate("products.product", "orderBy");
    if (getItems) {
      res.json(getItems);
    } else {
      res.json({ msg: "couldn't find item" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const emptyCart = async (req, res) => {
  const id = req.id;
  try {
    const userCart = await cartModel.findOneAndDelete({ orderBy: id });
    if (userCart) {
      return res.json(userCart);
    } else {
      res.json({ msg: "cart is currently empty" });
    }
  } catch (error) {
    return res.jason({ msg: error.message });
  }
};

const applyDiscount = async (req, res) => {
  try {
    const { couponCode } = req.body;
    const isValidCoupon = await CouponModel.findOne({ title: couponCode });

    if (isValidCoupon === null) {
      return res.json({ msg: "invalid Coupon" });
    }
    if (isValidCoupon.discount <= 0) {
      return res.json({ msg: "coupon is empty" });
    }

    const { subTotal } = await cartModel.findOne({ orderBy: req.id });
    let priceAfterDiscount = (
      subTotal -
      (subTotal * isValidCoupon.discount) / 100
    ).toFixed(2);

    const updateCart = await cartModel.findOneAndUpdate(
      { orderBy: req.id },
      { priceAfterDiscount },
      { new: true }
    );
    if (updateCart) {
      res.json(priceAfterDiscount);
    }
  } catch (error) {
    res.json({ msg: error.message });
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
  uploadProductImage,
  createCart,
  getUserCart,
  emptyCart,
  applyDiscount,
};
