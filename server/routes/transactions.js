const Bluebird = require('bluebird')
const express = require('express')
const { getAccountWithTransactionsById } = require('../models/accounts')
const { accountTypes } = require('../models/account-types')
const { createTransaction } = require('../models/transactions')
const { wrapAsync } = require('../utils')
const router = express.Router()

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const { accountId, amount, description } = req.body
    await createTransaction(accountId, amount, description)

    const account = await getAccountWithTransactionsById(accountId)
    res.send({ account })
  })
)

module.exports = router
