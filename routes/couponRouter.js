const express = require('express')
const {createCoupon, UpdateCoupon} = require('../controllers/couponController')
const router = express.Router()


router.post('/createCoupon', createCoupon)
router.post('/updateCoupon/:id', UpdateCoupon)

module.exports = router