const express = require("express");
const productRouter = express.Router();
const {
  uploadProduct,
  getProducts,
  getProduct,
  updateProduct,
  addToWishlist,
  removeFromWishlist
} = require("../controllers/productControllers");
const { authMiddleWare } = require("../helpers/middlewares");

productRouter.post("/", uploadProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.patch("/:id", updateProduct);
productRouter.patch("/addToWishlist", authMiddleWare, addToWishlist);
productRouter.put("/add", authMiddleWare, addToWishlist)
productRouter.put("/remove", authMiddleWare, removeFromWishlist)

module.exports = productRouter;
