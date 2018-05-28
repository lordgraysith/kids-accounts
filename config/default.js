module.exports = {
  nodeEnv: process.env.NODE_ENV,
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
