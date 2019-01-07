'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://api.8582333.com/api"',
  SOCKET_ADDRESS:'"ws://api.8582333.com/ws/websocket"'
})
