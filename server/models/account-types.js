const { map } = require('lodash')
const { query } = require('../db')
const { objectifyProperties } = require('../utils')
const accountTypes = {
  MAIN: 'Main',
  TITHING: 'Tithing',
  SHORT_TERM_SAVINGS: 'Short Term Savings',
  LONG_TERM_SAVINGS: 'Long Term Savings'
}

async function getAccountTypeById (id) {
  const types = await query(
    'SELECT * FROM "kids-accounts".account_types where id = $1',
    [id]
  )
  return objectifyProperties(types[0])
}

module.exports = {
  getAccountTypeById,
  accountTypes
}
