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

    if (allCoupons) {
      res.json(allCoupons);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const getSingleCoupon = async (req, res) => {
  const coupon = await CouponModel.find({title: req.query?.title});
  if (coupon) {
    return res.json(coupon);
  }
  try {
  } catch (error) {
    return res.status(404).json(error?.message)
  }
};
module.exports = { createCoupon, UpdateCoupon, deleteCoupon, getAllCoupons, getSingleCoupon };
