const express = require('express')
const {createCoupon, UpdateCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, getACoupon} = require('../controllers/couponController')
const router = express.Router()

router.post('/createCoupon', createCoupon)
router.post('/updateCoupon/:id', UpdateCoupon)
router.delete('/deletecoupon/:id', deleteCoupon)
router.get('/', getAllCoupons)
router.get('/:id', getACoupon)
router.get('/single', getSingleCoupon)

module.exports = router