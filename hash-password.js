const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const password = process.argv[2]

if (!password) {
  console.error('Add password as an argument')
  process.exit(1)
}
hash.update(password)
console.log(hash.digest('base64'))
