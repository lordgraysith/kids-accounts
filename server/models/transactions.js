const { query } = require('../db')

// create transaction
async function createTransaction (accountId, amount, description) {
  const result = await query(
    `
    INSERT INTO "kids-accounts".transactions
    (amount, description, account_id)
    VALUES($1, $2, $3);
    `,
    [amount, description, accountId]
  )
  return result
}

module.exports = {
  createTransaction
}
