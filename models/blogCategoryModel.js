const mongoose = require('mongoose')

const blogCGSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    }
})

const blogCGModel = mongoose.model('blogCategory', blogCGSchema)

module.exports = blogCGModel