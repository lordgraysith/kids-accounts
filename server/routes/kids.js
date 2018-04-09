const express = require('express')
const { getAllKids, getKidById } = require('../models/kids')
const {
  getAccountByKidIdAndType,
  getAccountsByKidId
} = require('../models/accounts')
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
router.get(
  '/:id/accounts',
  wrapAsync(async (req, res) => {
    const kid = await getKidById(req.params.id)
    const accounts = await getAccountsByKidId(req.params.id)
    res.send(Object.assign({}, kid, { accounts }))
  })
)

module.exports = router
