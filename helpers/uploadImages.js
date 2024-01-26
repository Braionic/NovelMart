const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

sharp.cache(false);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

function multerFilter(req, file, cb) {
  console.log(file, "from middleware");
  if (!file.mimetype.startsWith("image")) {
    cb(null, false);
  } else {
    cb(null, true);
  }
}

const resizeProductImage = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(200,200)
        .toFormat("jpeg", { mozjpeg: true })
        .jpeg({ quality: 90 })
        .toFile(`public/images/product/${file.filename}`);
      fs.unlinkSync(`public/images/product/${file.filename}`);
    })
  );
  return next();
};

const resizecategoryImage = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(100)
        .toFormat("jpeg", { mozjpeg: true })
        .jpeg({ quality: 90 })
        .toFile(`public/images/category/${file.filename}`);
      fs.unlinkSync(`public/images/category/${file.filename}`);
    })
  );
  return next();
};
const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

module.exports = { upload, resizeProductImage, resizecategoryImage };
