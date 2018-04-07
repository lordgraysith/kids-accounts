const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const kids = require('./routes/kids')
const payments = require('./routes/payments')
const graphqlSchema = require('./graphql-schema')
const graphqlContext = require('./graphql-context')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use('/api/kids', kids)
app.use('/api/payments', payments)
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlContext,
  graphqlExpress(req => ({
    schema: graphqlSchema,
    context: req.graphqlContext
  }))
)
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(port, () => console.log(`Listening on port ${port}`))
