const { map } = require('lodash')
const { query } = require('../db')
const { objectifyProperties } = require('../utils')

async function getAccountsByKidId (kidId) {
  const accounts = await query(
    `SELECT a.id, kid_id, account_type_id, at.description as account_type, sum(amount)::numeric as balance
      FROM "kids-accounts".accounts a
        JOIN "kids-accounts".transactions t
          ON t.account_id = a.id
        JOIN "kids-accounts".account_types at
          ON at.id = account_type_id
      WHERE kid_id = $1
      GROUP BY (a.id, kid_id, account_type_id, at.description)`,
    [kidId]
  )
  return map(accounts, objectifyProperties)
}

module.exports = {
  getAccountsByKidId
}
