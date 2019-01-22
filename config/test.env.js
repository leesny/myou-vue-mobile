'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"test"',
  BASE_API: '"https://api-test"',
  APP_ORIGIN: '"https://api-test.com"'
})
