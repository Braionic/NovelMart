const express = require('express')
const {createCoupon, UpdateCoupon, deleteCoupon, getAllCoupons} = require('../controllers/couponController')
const router = express.Router()


router.post('/createCoupon', createCoupon)
router.post('/updateCoupon/:id', UpdateCoupon)
router.delete('/deletecoupon', deleteCoupon)
router.get('/', getAllCoupons)

module.exports = router