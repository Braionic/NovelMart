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
  uploadProductImage
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

module.exports = productRouter;
