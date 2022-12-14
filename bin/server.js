const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../.env') })

const app = require('../app')
const { getTransactionsRecursion } = require('../services')
const PORT = process.env.PORT || 8082
const { DB_HOST } = process.env

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful')

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
      // Start load DB with getTransactionsRecursion func
      getTransactionsRecursion()
    })
  })
  .catch(err => {
    console.log('Cannot create connection to DB')
    console.log(err.message)
    process.exit(1)
  })
