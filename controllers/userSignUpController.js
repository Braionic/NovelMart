const userModel = require("../models/userModel");

const signupController = async (req, res)=>{
    const {name, email, password, mobile} = req.body
    const User = new userModel(req.body)
    try {
        const savedData = await User.save()
        res.json(savedData)
    } catch (error) {
        res.json(`error: ${error}`)
    }
}
module.exports = signupController
