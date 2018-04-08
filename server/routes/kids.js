const express = require('express')
const { getAllKids, getKidById } = require('../models/kids')
const { getAccountByKidIdAndType } = require('../models/accounts')
const { accountTypes } = require('../models/account-types')
const { wrapAsync } = require('../utils')
const router = express.Router()

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const kids = await getAllKids()
    res.send(kids)
  })
)
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const kid = await getKidById(req.params.id)
    const mainAccount = await getAccountByKidIdAndType(
      req.params.id,
      accountTypes.MAIN
    )
    res.send(Object.assign({}, kid, { mainAccount }))
  })
)

module.exports = router
