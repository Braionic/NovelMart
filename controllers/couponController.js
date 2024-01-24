const CouponModel = require("../models/couponModels");

const createCoupon = async (req, res) => {
  try {
    const newCoupon = new CouponModel(req.body);
    const saveCoupon = await newCoupon.save();
    if(saveCoupon){
        return res.json(saveCoupon)
    }
  } catch (error) {
    res.json(error.message);
  }
};

const UpdateCoupon = async (req, res)=> {
    const updatedCoupon = await CouponModel.findByIdAndUpdate(req.params.id, {title: req.body.title, discount: req.body.discount, date: req.body.date}, {new: true})
if(updatedCoupon){
    res.json(updatedCoupon)
}
}

module.exports = {createCoupon, UpdateCoupon};
