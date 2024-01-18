const brandModel = require("../models/brandModel");

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

module.exports = createBrand;
