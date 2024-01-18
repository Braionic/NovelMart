const blogCGModel = require("../models/blogCategoryModel");

//create a blog post
const createCategory = async (req, res) => {
  console.log("working");
  try {
    const createCategory = new blogCGModel(req.body);
    const saveCategory = await createCategory.save();
    if (saveCategory) {
      return res.json(saveCategory);
    }
  } catch (error) {
    res.json({ msg: error.message, status: "failed to insert" });
  }
};

//update blog category

const updateCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await blogCGModel.findByIdAndUpdate(
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
module.exports = { createCategory, updateCategory };
