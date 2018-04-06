const express = require('express')
const kids = require('./routes/kids')

const app = express()
const port = process.env.PORT || 5000

app.use('/api/kids', kids)

app.listen(port, () => console.log(`Listening on port ${port}`))
