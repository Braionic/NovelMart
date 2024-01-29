const express = require("express");
const productRouter = express.Router();
const {
  uploadProduct,
  getProducts,
  getProduct,
  updateProduct,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  rateProduct,
  uploadProductImage,
  cart,
  getUserCart,
  emptyCart,
  applyDiscount
} = require("../controllers/productControllers");
const { authMiddleWare } = require("../helpers/middlewares");
const { upload, resizeProductImage } = require("../helpers/uploadImages");

productRouter.post("/", uploadProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.patch("/:id", updateProduct);
productRouter.patch("/addToWishlist", authMiddleWare, addToWishlist);
productRouter.put("/add", authMiddleWare, addToWishlist)
productRouter.put("/remove", authMiddleWare, removeFromWishlist)
productRouter.put("/addtocart", authMiddleWare, addToCart)
productRouter.put("/rateProduct", rateProduct)
productRouter.post("/uploadImage/:id", upload.array('images', 10), resizeProductImage, uploadProductImage)
productRouter.post("/cart", authMiddleWare, cart)
productRouter.post("/mycart/",authMiddleWare, getUserCart)
productRouter.delete("/emptycart", authMiddleWare, emptyCart)
productRouter.post("/applydiscount", authMiddleWare, applyDiscount)


module.exports = productRouter;
