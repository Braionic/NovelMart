const { uploadImage } = require("../helpers/cloudinary");
const fs = require("fs")

const uploadProductImageController = async (req, res) => {
  try {
    const files = req.files;
    let images = []; 
    //console.log(files, files instanceof Object)
    for (const file of files) {
        const image = await uploadImage(file.path, "images")
        images.push(image)
        fs.unlinkSync(file.path);
    }
    const imageUrl = images.map((uri)=> uri)
    res.status(200).json(imageUrl)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
};

module.exports = uploadProductImageController
