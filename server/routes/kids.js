const express = require('express')
const { getAll, getById } = require('../models/kids')
const { wrapAsync } = require('../utils')
const router = express.Router()

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const kids = await getAll()
    res.send(kids)
  })
)
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const kid = await getById(req.params.id)
    res.send(kid)
  })
)

module.exports = router
