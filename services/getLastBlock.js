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

const getLastBlock = async () => {
  try {
    const { data } = await request.get('/', {
      baseURL: BASE_URL,
      params: {
        module: 'proxy',
        action: 'eth_blockNumber',
        apikey: API_KEY,
      },
    })
    console.log(data)
    return data.result
  } catch (error) {
    console.log(error)
  }
}
module.exports = { getLastBlock }
