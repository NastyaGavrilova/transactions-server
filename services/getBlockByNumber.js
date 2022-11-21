const axios = require('axios')
const rateLimit = require('axios-rate-limit')
require('dotenv').config()

const { API_KEY } = process.env
const BASE_URL = 'https://api.etherscan.io/api'
axios.defaults.baseURL = `${BASE_URL}`
const request = rateLimit(axios.create({}), {
  maxRequests: 5,
  perMilliseconds: 1000,
})

const getBlockByNumber = async blockNumber => {
  try {
    const { data } = await request.get('/', {
      baseURL: BASE_URL,
      params: {
        module: 'proxy',
        action: 'eth_getBlockByNumber',
        tag: blockNumber,
        boolean: true,
        apikey: API_KEY,
      },
    })
    return data.result
  } catch (error) {
    console.log(error)
  }
}
module.exports = { getBlockByNumber }
