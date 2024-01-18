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


const createBrand = async (req, res) => {
    console.log(req.body)
  try {
    const createCategory = new brandModel(req.body);
    const saveCategory = await createCategory.save();
    if (saveCategory) {
      return res.json(saveCategory);
    }
  } catch (error) {
    console.log(error)
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
module.exports = {createBrand, allBrands, updateBrand, deleteBrand}
