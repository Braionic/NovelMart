const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME2,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRETE,
});

const uploadImage = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve({
        res: res.secure_url,
        public_id: res.public_id,
        asset_id: res.asset_id,
      });
    });
  });
};

const deleteImage = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(file, (err, res) => {
      if (err) return res.status(500).send("delete image error");
      resolve({
        res: res.secure_url,
        public_id: res.asset_id,
        asset_id: res.asset_id,
      });
    });
  });
};

module.exports = {uploadImage, deleteImage};
