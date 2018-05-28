const config = require('config')
const jwt = require('jsonwebtoken')

function auth (req, res, next) {
  const { headers } = req
  const { authtoken: authToken } = headers
  if (!authToken) {
    res.status(401)
    return res.send({ message: 'No auth token' })
  }
  try {
    const { username } = jwt.verify(authToken, config.get('authSecret'))
    res.locals = Object.assign({}, res.locals, { username })
  } catch (ex) {
    res.status(401)
    return res.send({ message: ex.message })
  }
  return next()
}

module.exports = auth
