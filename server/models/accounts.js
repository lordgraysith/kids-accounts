const { map } = require('lodash')
const { query } = require('../db')
const { objectifyProperties } = require('../utils')

async function getAccountsByKidId (kidId) {
  const accounts = await query(
    `SELECT a.id, kid_id, account_type_id, at.description as account_type, sum(amount)::numeric as balance
      FROM "kids-accounts".accounts a
        LEFT OUTER JOIN "kids-accounts".transactions t
          ON t.account_id = a.id
        JOIN "kids-accounts".account_types at
          ON at.id = account_type_id
      WHERE kid_id = $1
      GROUP BY (a.id, kid_id, account_type_id, at.description)`,
    [kidId]
  )
  return map(accounts, objectifyProperties)
}

async function getAccountByKidIdAndType (kidId, type) {
  const accounts = await query(
    `SELECT a.id, kid_id, account_type_id, at.description as account_type, sum(amount)::numeric as balance
      FROM "kids-accounts".accounts a
        LEFT OUTER JOIN "kids-accounts".transactions t
          ON t.account_id = a.id
        JOIN "kids-accounts".account_types at
          ON at.id = account_type_id
      WHERE kid_id = $1
        AND at.description = $2
      GROUP BY (a.id, kid_id, account_type_id, at.description)`,
    [kidId, type]
  )
  return objectifyProperties(accounts[0])
}

async function getAccountWithTransactionsById (accountId) {
  const accounts = await query(
    `SELECT a.id, at.description as account_type, t.description, t.created_date,
        amount, sum(amount) over (partition by a.id) as balance
      FROM "kids-accounts".accounts a
        LEFT OUTER JOIN "kids-accounts".transactions t
          ON t.account_id = a.id
        JOIN "kids-accounts".account_types at
          ON at.id = account_type_id
      WHERE a.id = $1 limit 100`,
    [accountId]
  )
  const transactions = map(accounts, account => {
    const transaction = objectifyProperties(account)
    return {
      amount: transaction.amount,
      description: transaction.description,
      createdDate: transaction.createdDate
    }
  })
  const account = objectifyProperties(accounts[0])
  return {
    name: account.accountType,
    transactions,
    balance: account.balance
  }
}

module.exports = {
  getAccountsByKidId,
  getAccountByKidIdAndType,
  getAccountWithTransactionsById
}
