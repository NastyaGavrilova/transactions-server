require('dotenv').config()

const sleep = require('../utils/sleepFunction')
const hexToDec = require('../utils/hexToDec')
const getTransactions = require('./getTransactions')
const { getLastBlock } = require('./getLastBlock')

const getTransactionsRecursion = async (lastAddedBlock = 1) => {
  const lastBlock = await getLastBlock()
  const lastBlockNumber = hexToDec(lastBlock)
  const endBlockNumber = lastBlockNumber - 1000
  console.log('number of end block: ', endBlockNumber)
  console.log('last added block: ', lastAddedBlock)

  let lastAddedToDBBlock
  if (endBlockNumber !== lastAddedBlock) {
    lastAddedToDBBlock = await getTransactions(lastBlockNumber, endBlockNumber)
    console.log('last added block to db: ', lastAddedToDBBlock)
    sleep(200)
    await getTransactionsBundle(lastAddedToDBBlock)
  } else {
    sleep(200)
    await getTransactionsBundle(lastAddedToDBBlock || endBlockNumber)
  }
}
module.exports = getTransactionsRecursion
