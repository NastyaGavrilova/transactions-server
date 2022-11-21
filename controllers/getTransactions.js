const { Transaction } = require('../models')
const { getLastBlock } = require('../services/getLastBlock')

const getTransactions = async (req, res) => {
  const currentBlockNumber = await getLastBlock()
  const { searchQuery, filter, page = 1, limit = 14 } = req.query

  const options = {
    page,
    limit,
  }

  const result = await Transaction.paginate(
    { [filter]: searchQuery },
    options,
    await function (err, result) {
      if (err) {
        console.error(err)
      } else {
        return result
      }
    },
  )

  res.status(200).json({
    code: 200,
    status: 'success',
    data: {
      transactions: result.docs,
      totalPageCount: result.totalPages,
      page: result.page,
      currentBlockNumber,
    },
  })
}

module.exports = getTransactions
