'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"uat"',
  BASE_API: '"https://api-uat"',
  APP_ORIGIN: '"https://api-uat.com"'
})
