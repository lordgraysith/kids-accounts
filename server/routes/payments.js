const express = require('express')
const { wrapAsync } = require('../utils')
const router = express.Router()

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { payment } = req.body
    const { kidId, amount } = payment
    // get accounts by account type and kidId
    // post a transaction to each account with the right percentage of money
    // return a success message
  })
)

module.exports = router
