const cloudinary = require('cloudinary').v2
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME2, 
  api_key: process.env.CLOUD_API, 
  api_secret: process.env.CLOUD_API_SECRETE
});


 const uploadImage = async (file)=>{
  return new Promise(resolve => {
    cloudinary.uploader.upload( file , (err, res) => {
      if (err) return res.status(500).send("upload image error")
        resolve({ 
          res: res.secure_url
        }) 
      }
    ) 
})
}


module.exports = uploadImage