const { map } = require('lodash')
const { query } = require('../db')
const { objectifyProperties } = require('../utils')

async function getAllKids () {
  const kids = await query('SELECT id, name FROM "kids-accounts".kids')
  return map(kids, objectifyProperties)
}

async function getKidById (id) {
  const rows = await query(
    'SELECT id, name FROM "kids-accounts".kids where id = $1',
    [id]
  )
  return objectifyProperties(rows[0])
}

module.exports = {
  getAllKids,
  getKidById
}
