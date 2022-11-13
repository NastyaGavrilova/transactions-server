const getRecentBlock = require('./getRecentBlock')
const getRecentBlockNumber = require('./getRecentBlockNumber')
const getRecentBlockRecursion = require('./getRecentBlockRecursion')
const getFirstTransactions = require('./getFirtTransactions')
const removeAllTransactions = require('./removeAllTransactions')
const removeOneBlock = require('./removeOneBlock')

module.exports = {
  getRecentBlock,
  getRecentBlockNumber,
  getRecentBlockRecursion,
  getFirstTransactions,
  removeAllTransactions,
  removeOneBlock,
}
