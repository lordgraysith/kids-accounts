const { map } = require('lodash')
const { query } = require('../db')
const { objectifyProperties } = require('../utils')

// get account by id and accountType

async function getAccountsByKidId (kidId) {
  const accounts = await query(
    `SELECT a.id, kid_id, account_type_id, sum(amount)::numeric as balance
      FROM "kids-accounts".accounts a
        JOIN "kids-accounts".transactions t
          ON t.account_id = a.id
      WHERE kid_id = $1
      GROUP BY (a.id, kid_id, account_type_id)`,
    [kidId]
  )
  return map(accounts, objectifyProperties)
}

module.exports = {
  getAccountsByKidId
}
