
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./windows11.cjs.production.min.js')
} else {
  module.exports = require('./windows11.cjs.development.js')
}
