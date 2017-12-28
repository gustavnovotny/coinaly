const bittrex = require('node-bittrex-api')
const express = require('express')
const router = express.Router()

// TODO: move this to environment vars
const API_KEY = '7fb245cfe8d3474381cffae570dcca51'
const API_SECRET = '44264389978e40c0ac665fb9d3334d21'

bittrex.options({
  'apikey': API_KEY,
  'apisecret': API_SECRET,
  verbose: true
})

// https://www.npmjs.com/package/node.bittrex.api

router.get('/balances', function (request, response, next) {
  bittrex.getbalances((data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/orderhistory', function (request, response, next) {
  bittrex.getorderhistory({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/withdrawalhistory', function (request, response, next) {
  bittrex.getwithdrawalhistory({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/deposithistory', function (request, response, next) {
  bittrex.getdeposithistory({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

router.get('/openorders', function (request, response, next) {
  bittrex.getopenorders({}, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      if (!data) {
        response.status(500).json({'message': 'Are you sure your API key has the trade permissions?'})
      } else {
        response.status(500).json(data)
      }
    }
  })
})

router.get('/market/cancel', function (request, response, next) {
  const uuid = request.query.uuid
  if (!uuid) {
    response.status(500).json({'message': 'Please provide an uuid'})
    return
  }

  bittrex.cancel({ uuid: uuid }, (data) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

// TODO: do with websocket
router.get('/ticker', function (request, response, next) {
  bittrex.getticker({}, ticker => {
    response.json(ticker)
  })
})

// TODO: do with websocket
router.get('/marketsummaries', function (request, response, next) {
  bittrex.getmarketsummaries((data, error) => {
    if (data && data.success) {
      response.json(data.result)
    } else {
      response.status(500).json(data)
    }
  })
})

module.exports = router