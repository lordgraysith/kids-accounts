const { query } = require('../db')

async function getAll () {
  return await query('SELECT id, name FROM "kids-accounts".kids')
}

async function getById (id) {
  const rows = await query(
    'SELECT id, name FROM "kids-accounts".kids where id = $1',
    [id]
  )
  return rows[0]
}

module.exports = {
  getAll,
  getById
}
