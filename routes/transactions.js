const express = require('express')
const router = express.Router()

const { getTransactions } = require('../controllers')
const { validateGetTransactions } = require('../middlewares/validation')

router.get('/', validateGetTransactions, getTransactions)
module.exports = router
