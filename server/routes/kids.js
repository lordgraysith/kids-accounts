const express = require('express')
const { getAllKids, getKidById } = require('../models/kids')
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
    res.send(kid)
  })
)

module.exports = router
