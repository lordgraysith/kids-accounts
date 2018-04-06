function wrapAsync (asyncFunc) {
  return (req, res, next) => {
    asyncFunc(req, res).then(() => next()).catch(ex => next(ex))
  }
}

module.exports = {
  wrapAsync
}
