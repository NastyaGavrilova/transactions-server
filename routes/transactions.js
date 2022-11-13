const express = require('express')
const router = express.Router()
const { ctrlWrapper, validation } = require('../middlewares')

const {
  getTransactions,
  getBySearchParams,
  getBlockByNumber,
} = require('../controllers')

router.get('/', ctrlWrapper(getTransactions))
router.get('/search', ctrlWrapper(getBySearchParams))
router.get('/searchByBlockNumber', ctrlWrapper(getBlockByNumber))

module.exports = router
