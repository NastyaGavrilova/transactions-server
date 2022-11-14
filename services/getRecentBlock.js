const { Transaction } = require('../models')
const convertDate = require('../utils/converDate')
const hexToDec = require('../utils/hexToDec')
const transactionFeeCalculator = require('../utils/transactionFee')
const weiToEth = require('../utils/weiToEth')
const getFirstTransactions = require('./getFirtTransactions')
const axios = require('axios')
const { API_KEY } = process.env

const getRecentBlock = async recentBlockNumber => {
  const { data } = await axios.get(
    `/api?module=proxy&action=eth_getBlockByNumber&tag=${recentBlockNumber}&boolean=true&apikey=${API_KEY}`,
  )
  blockData = data.result

  const recentBlockTransactions = blockData.transactions

  const recentBlockDate = convertDate(blockData.timestamp)

  const count = await Transaction.count()
  console.log('Total transactions count in collection is', count)
  if (count === 0) {
    
    await getFirstTransactions(recentBlockNumber)
    console.log('Collection Transactions is filled with transactions.')
  }
  console.log(`working with block number `, hexToDec(recentBlockNumber))

  recentBlockTransactions.map(async item => {
    const sameTransaction = await Transaction.findOne({
      transactionId: item.hash,
    })
    if (!sameTransaction && item.to) {
      await Transaction.create({
        blockHash: item.blockHash,
        blockNumber: hexToDec(item.blockNumber),
        transactionId: item.hash,
        senderAddress: item.from,
        recipientsAddress: item.to,
        blockConfirmations: 0,
        date: recentBlockDate,
        value: weiToEth(item.value),
        transactionFee: transactionFeeCalculator(item.gas, item.gasPrice),
      })
    }
  })
  return
}
module.exports = getRecentBlock
