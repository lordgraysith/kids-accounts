const Bluebird = require('bluebird')
const express = require('express')
const {
  getAccountsByKidId,
  getAccountByKidIdAndType
} = require('../models/accounts')
const { accountTypes } = require('../models/account-types')
const { createTransaction } = require('../models/transactions')
const { wrapAsync } = require('../utils')
const router = express.Router()

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { kidId, amount, description } = req.body
    const accounts = await getAccountsByKidId(kidId)
    await Bluebird.map(accounts, async account => {
      if (amount < 0 && account.accountType === accountTypes.MAIN) {
        await createTransaction(account.id, amount, description)
      } else if (amount > 0) {
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
      }
    })
    const mainAccount = await getAccountByKidIdAndType(kidId, accountTypes.MAIN)
    res.send({ mainAccount })
  })
)

module.exports = router
