const { deleteImage } = require("../helpers/cloudinary")

const deleteProductImages = async(req, res)=>{
    try {
      const deletedImage = await deleteImage(req.params.id)
     if(deletedImage){
       return res.json({msg: "deleted successfully"})
     }
    } catch (error) {
      return res.json({msg: error.message})
    }
  }

  module.exports = deleteProductImages