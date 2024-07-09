const blogCGModel = require("../models/blogCategoryModel");

const getSingleCat = async (req, res) => {
  try {
    const getCat = await blogCGModel.find({
      title: { $regex: new RegExp("^" + req.query.title.toLowerCase(), "i") },
    });
    if (getCat) {
      return res.json(getCat);
    }
  } catch (error) {
    return res.status()
  }
  };

//get all blog categories
const allCategory = async (req, res) => {
  try {
    const prdcategory = await blogCGModel.find({});
    if (prdcategory) {
      res.json(prdcategory);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
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

//delete a blog category

const deleteCategory = async (req, res) => {
  const id = req.params?.id;
  try {
    const deletedCategory = await blogCGModel.findByIdAndDelete(id);
    if (deletedCategory) {
      res.json(deletedCategory);
    } else {
      res.json({ msg: "no category found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  allCategory,
  getSingleCat
};
