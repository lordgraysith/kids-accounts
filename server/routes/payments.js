const Bluebird = require('bluebird')
const express = require('express')
const { getAccountsByKidId } = require('../models/accounts')
const { accountTypes } = require('../models/account-types')
const { createTransaction } = require('../models/transactions')
const { wrapAsync } = require('../utils')
const router = express.Router()

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { payment } = req.body
    const { kidId, amount, description } = payment
    const accounts = await getAccountsByKidId(kidId)
    await Bluebird.map(accounts, async account => {
      let transactionAmount
      switch (account.accountType) {
        case accountTypes.MAIN:
          transactionAmount = amount * 0.7
          break
        default:
          transactionAmount = amount * 0.1
          break
      }
      await createTransaction(account.id, transactionAmount, description)
    })
    res.send({ success: true })
  })
)

module.exports = router
