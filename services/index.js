const { getLastBlock } = require('./getLastBlock')
const { getBlockByNumber } = require('./getBlockByNumber')
const getTransactionsRecursion = require('./getTransactionsRecursion')
const getTransactions = require('./getTransactions')
const removeAllTransactions = require('./removeAllTransactions')

module.exports = {
  getLastBlock,
  getBlockByNumber,
  getTransactionsRecursion,
  getTransactions,
  removeAllTransactions,
}
