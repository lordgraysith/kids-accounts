module.exports = {
  pg: {
    connectionString: process.env.PG_CONNECTION_STRING
  },
  authSecret: process.env.AUTH_SECRET,
  passwords: [
    {
      username: 'michael',
      password: process.env.MICHAEL_PW
    },
    {
      username: 'velvet',
      password: process.env.VELVET_PW
    }
  ]
}
