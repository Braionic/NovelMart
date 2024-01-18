const PDCategoryModel = require("../models/productCategoryModel");

//get all product category

const allCategory = async (req, res) => {
  try {
    const prdcategory = await PDCategoryModel.find({});
    if (prdcategory) {
      res.json(prdcategory);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
//create category
const createCategoty = async (req, res) => {
  console.log(req.body);

  const createCategory = new PDCategoryModel(req.body);
  const saveCategory = await createCategory.save();
  if (saveCategory) {
    return res.json(saveCategory);
  }
};

//update blog category

const updateCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await PDCategoryModel.findByIdAndUpdate(
      id,
      { title: req.body?.title },
      {
        new: true,
      }
    );
    console.log(product);
    if (product) {
      res.json(product);
    } else {
      res.json({ msg: "Category not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//delete a blog category

const deleteCategory = async (req, res) => {
  const id = req.params?.id;

  try {
    const deletedCategory = await PDCategoryModel.findByIdAndDelete(id);
    console.log(deletedCategory, "knjnk");
    if (deletedCategory) {
      res.json(deletedCategory);
    } else {
      res.json({ msg: "no category found hh" });
    }
  } catch (error) {
    console.log(error.message, "kjhgkljhgv");
  }
};
module.exports = { createCategoty, updateCategory, deleteCategory, allCategory };
