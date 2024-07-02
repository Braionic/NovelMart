const { default: mongoose } = require("mongoose");
const brandModel = require("../models/brandModel");



//get all blog categories
const allBrands = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    if (brands) {
      res.json(brands);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getSingleBrand = async (req, res) => {
  console.log("this is the req", req.query)
  try {
    const brands = await brandModel.find({title: { $regex: new RegExp("^" + req.query?.title.toLowerCase(), "i") }});
    if (brands) {
      res.status(200).json(brands);
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};


const createBrand = async (req, res) => {
    console.log(req.body)
  try {
    const brandExist = await brandModel.find({title: req.body.title})
    
    if(brandExist.length > 0){
      return res.status(406).json(`${brandExist[0].title} already exist`)
    }
    const createCategory = new brandModel(req.body);
    const saveCategory = await createCategory.save();
    if (saveCategory) {
      return res.status(201).json(saveCategory);
    }
  } catch (error) {
    return res.status(400).json(error.message)
  }
};

const updateBrand = async (req, res) => {
  const id = req.params.id;

  try {
    const brands = await brandModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { title: req.body?.title },
      {
        new: true,
      }
    );
   
    if (brands) {
      res.json(brands);
    } else {
      res.json({ msg: "Brand not found" });
    }
  } catch (error) {
    res.json({msg: error.message})
  }
};

//delete a blog category

const deleteBrand = async (req, res) => {
  const id = req.params?.id;
  try {
    const deletedBrand = await brandModel.findByIdAndDelete(id);
    if (deletedBrand) {
      res.json(deletedBrand);
    } else {
      res.json({ msg: "no Brand was found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {createBrand, allBrands, updateBrand, deleteBrand, getSingleBrand}
