const { getAllKids, getKidById } = require('./models/kids')
const { getAccountsByKidId } = require('./models/accounts')
const { getAccountTypeById } = require('./models/account-types')

module.exports = (req, res, next) => {
  req.graphqlContext = {
    db: {
      getAllKids: cachify(getAllKids),
      getKidById: cachifyWithId(getKidById),
      getAccountsByKidId: cachifyWithId(getAccountsByKidId),
      getAccountTypeById: cachifyWithId(getAccountTypeById)
    }
  }
  next()
}

function cachify (func) {
  let cache
  return async function () {
    if (!cache) {
      cache = await func()
    }
    return cache
  }
}

function cachifyWithId (func) {
  const cache = {}
  return async function (id) {
    if (!cache[id]) {
      cache[id] = await func(id)
    }
    return cache[id]
  }
}
