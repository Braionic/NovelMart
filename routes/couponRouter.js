const express = require('express')
const {createCoupon, UpdateCoupon, deleteCoupon} = require('../controllers/couponController')
const router = express.Router()


router.post('/createCoupon', createCoupon)
router.post('/updateCoupon/:id', UpdateCoupon)
router.delete('/deletecoupon', deleteCoupon)

module.exports = router