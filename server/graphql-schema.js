const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Kid {
    id: ID!
    name: String
    accounts: [Account]
  }
  type Account {
    id: ID!
    type: AccountType
    balance: Float
  }
  type AccountType {
    id: ID!
    description: String
  }
  type Query { kids: [Kid] }
`

const resolvers = {
  Query: {
    async kids (_, __, ctx) {
      return ctx.db.getAllKids()
    }
  },
  Kid: {
    async accounts (kid, _, ctx) {
      return ctx.db.getAccountsByKidId(kid.id)
    }
  },
  Account: {
    async type (account, _, ctx) {
      return ctx.db.getAccountTypeById(account.accountTypeId)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
