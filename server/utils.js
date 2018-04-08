const { reduce } = require('lodash')
const camel = require('to-camel-case')
function wrapAsync (asyncFunc) {
  return (req, res, next) => {
    asyncFunc(req, res).then(() => next()).catch(ex => next(ex))
  }
}

function objectifyProperties (obj) {
  if (!obj) return obj
  return reduce(
    Object.keys(obj),
    (newObj, key) => {
      return Object.assign(newObj, {
        [camel(key)]: obj[key]
      })
    },
    {}
  )
}

module.exports = {
  wrapAsync,
  objectifyProperties
}
