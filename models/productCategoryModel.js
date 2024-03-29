const mongoose = require('mongoose')


const PDCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, {timeseries: true})

const PDCategoryModel = mongoose.model('PDcategory', PDCategorySchema)

module.exports = PDCategoryModel