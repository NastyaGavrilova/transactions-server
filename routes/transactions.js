const express = require('express')
const router = express.Router()
const { ctrlWrapper } = require('../middlewares')
const {
  validateGetTransactions,
  validateGetTransactionsBySearchParams,
  validateGetTransactionsByBlockNumber,
} = require('../middlewares/validation')

const {
  getTransactions,
  getBySearchParams,
  getBlockByNumber,
} = require('../controllers')

router.get('/', validateGetTransactions, ctrlWrapper(getTransactions))
router.get(
  '/search',
  validateGetTransactionsBySearchParams,
  ctrlWrapper(getBySearchParams),
)
router.get(
  '/searchByBlockNumber',
  validateGetTransactionsByBlockNumber,
  ctrlWrapper(getBlockByNumber),
)

module.exports = router
