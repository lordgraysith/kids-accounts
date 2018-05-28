const Bluebird = require('bluebird')
const express = require('express')
const auth = require('../middleware/auth')
const { getAccountWithTransactionsById } = require('../models/accounts')
const { accountTypes } = require('../models/account-types')
const {
  createTransaction,
  sumAllTransactions
} = require('../models/transactions')
const { wrapAsync } = require('../utils')
const router = express.Router()
router.use(auth)

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { accountId, amount, description } = req.body
    await createTransaction(accountId, amount, description)

    const account = await getAccountWithTransactionsById(accountId)
    res.send({ account })
  })
)

router.get(
  '/sum',
  wrapAsync(async (req, res) => {
    const sum = await sumAllTransactions()
    res.send(sum)
  })
)

module.exports = router
