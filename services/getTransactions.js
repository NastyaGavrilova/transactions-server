const { Transaction } = require('../models')
const hexToDec = require('../utils/hexToDec')
const decToHex = require('../utils/decToHex')
const covertDate = require('../utils/converDate')
const weiToEth = require('../utils/weiToEth')
const transactionFeeCalculator = require('../utils/transactionFee')
const { getBlockByNumber } = require('./getBlockByNumber')
require('dotenv').config()

const getTransactions = async (lastBlockNumber, endBlockNumber) => {
  await Transaction.deleteMany({
    blockNumber: { $lt: endBlockNumber },
  })

  for (let i = lastBlockNumber; i > endBlockNumber; i--) {
    const currentBlock = await getBlockByNumber(decToHex(i))
    const blockDate = covertDate(currentBlock.timestamp)
    await Promise.all(
      currentBlock.transactions.map(async item => {
        if (item.to) {
          try {
            await Transaction.create({
              blockHash: item.blockHash,
              blockNumber: hexToDec(item.blockNumber),
              transactionId: item.hash,
              senderAddress: item.from,
              recipientsAddress: item.to,
              blockConfirmations: hexToDec(item.transactionIndex),
              date: blockDate,
              value: weiToEth(item.value),
              transactionFee: transactionFeeCalculator(item.gas, item.gasPrice),
            })
          } catch (error) {
            console.log(error)
          }
        }
      }),
    )
    if (i === endBlockNumber + 1) {
      return endBlockNumber
    }
  }
}
module.exports = getTransactions
