const { Pool } = require('pg')
const config = require('config')

const pool = new Pool({
  connectionString: config.pg.connectionString,
  max: 2
})

// console.log('conString', config.pg.connectionString)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

async function query (queryStatement, params) {
  let results
  const client = await pool.connect()
  try {
    const res = await client.query(queryStatement, params)
    results = res.rows
  } catch (ex) {
    console.error(ex)
    throw ex
  } finally {
    client.release()
  }
  return results
}

module.exports = {
  query
}
