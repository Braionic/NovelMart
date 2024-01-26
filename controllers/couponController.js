const uploadImage = require("../helpers/cloudinary");
const CouponModel = require("../models/couponModels");

const createCoupon = async (req, res) => {
  try {
    const newCoupon = new CouponModel(req.body);
    const saveCoupon = await newCoupon.save();
    if (saveCoupon) {
      return res.json(saveCoupon);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const UpdateCoupon = async (req, res) => {
  const updatedCoupon = await CouponModel.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, discount: req.body.discount, date: req.body.date },
    { new: true }
  );
  if (updatedCoupon) {
    res.json(updatedCoupon);
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await CouponModel.findByIdAndDelete(req.body.id);
    if (deletedCoupon) {
      res.json(deletedCoupon);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const allCoupons = await CouponModel.find({});
    uploadImage()
    if (allCoupons) {
      res.json(allCoupons);
    }
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = { createCoupon, UpdateCoupon, deleteCoupon, getAllCoupons };
