
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./tsdxthreejstemplate.cjs.production.min.js')
} else {
  module.exports = require('./tsdxthreejstemplate.cjs.development.js')
}
