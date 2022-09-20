const stripePayment = require('../controllers/stripe')

const router = require('express').Router()

router.post('/payment',stripePayment)


module.exports = router