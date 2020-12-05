const config = require('config')
const jwt = require('jsonwebtoken')
const express = require('express')
const crypto = require('crypto')
const { find } = require('lodash')
const router = express.Router()

router.post('/login', (req, res) => {
  try {
    const { password } = req.body
    const hash = crypto.createHash('sha256')
    hash.update(password)
    const username = findUserByPassword(hash.digest('base64'))
    if (!username) {
      return res.status(401).send({ message: 'Invalid Passcode' })
    }
    const authToken = jwt.sign({ username }, config.get('authSecret'), {
      expiresIn: '6 months'
    })
    res.send({ authToken })
  } catch (ex) {
    console.log('ex.message', ex.message)
    res.status(401).send({ message: ex.message })
  }
})

function findUserByPassword (password) {
  const user = find(config.passwords, u => {
    return u.password === password
  })
  if (user) {
    return user.username
  } else {
    return null
  }
}

module.exports = router
