const express = require("express");
const { resizeProductImage, upload } = require("../helpers/uploadImages");
const { uploadProductImage} = require("../controllers/productControllers");
const uploadProductImageController = require("../controllers/uploadController");
const deleteProductImages = require("../controllers/deleteProductIMG");
const uploadRouter = express.Router();

uploadRouter.post(
  "/uploadImage/",
  upload.array("images", 10),
  resizeProductImage,
  uploadProductImageController
);

uploadRouter.delete("/deleteImage/:id", deleteProductImages)

module.exports = {uploadRouter}