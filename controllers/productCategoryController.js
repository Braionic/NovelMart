const PDCategoryModel = require("../models/productCategoryModel")

const createCategoty = async (req, res)=>{
    console.log(req.body)

    const createCategory = new PDCategoryModel(req.body)
    const saveCategory = await createCategory.save()
    if(saveCategory){
        return res.json(saveCategory)
    }
}

module.exports = createCategoty