const mongoose = require('mongoose')

const enqSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Sent", "Pending", "responded"],
        default: "Sent",
    }
})

const enqModel = mongoose.model("enquiry", enqSchema)

module.exports = enqModel