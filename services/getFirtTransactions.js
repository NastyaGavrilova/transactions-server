const { Transaction } = require('../models')
const axios = require('axios')
const hexToDec = require('../utils/hexToDec')
const decToHex = require('../utils/decToHex')
const covertDate = require('../utils/converDate')
const weiToEth = require('../utils/weiToEth')
const sleep = require('../utils/sleepFunction')
const transactionFeeCalculator = require('../utils/transactionFee')
require('dotenv').config()

const TOTAL_BLOCKS_IN_COLLECTION = 1000
const { API_KEY } = process.env
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io'
axios.defaults.baseURL = `${ETHERSCAN_BASE_URL}`

const getFirstTransactions = async recentBlockNumber => {
  const oldestBlockerNumberDB =
    hexToDec(recentBlockNumber) - TOTAL_BLOCKS_IN_COLLECTION
  for (let i = oldestBlockerNumberDB; i < hexToDec(recentBlockNumber); i++) {
    let blockNumber = `0x${decToHex(i)}`
    const { data } = await axios.get(
      `/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${API_KEY}`,
    )

    blockData = data.result
    console.log('found block number', hexToDec(blockNumber))

    const blockDataTransactions = blockData.transactions
    const blockDate = covertDate(blockData.timestamp)

    blockDataTransactions.map(async item => {
      if (item.to) {
        await Transaction.create({
          blockHash: item.blockHash,
          blockNumber: hexToDec(item.blockNumber),
          transactionId: item.hash,
          senderAddress: item.from,
          recipientsAddress: item.to,
          blockConfirmations: 0,
          date: blockDate,
          value: weiToEth(item.value),
          transactionFee: transactionFeeCalculator(item.gas, item.gasPrice),
        })
      }
    })
    sleep(150)
    const count = await Transaction.count()
    console.log(
      `Total transactions count in DB after adding block=${hexToDec(
        blockNumber,
      )}`,
      count,
    )
  }
}
module.exports = getFirstTransactions
