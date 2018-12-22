module.exports = {
  nodeEnv: 'dev',
  pg: {
    connectionString: 'postgresql://postgres@localhost:40000/postgres'
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
