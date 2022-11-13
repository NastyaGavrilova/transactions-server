// const colors = require("colors")
const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const app = express();

require("dotenv").config({ path: path.join(__dirname, "../.env") })

// const app = require('../app')
const PORT = process.env.PORT || 3000;
const { DB_HOST } = process.env
async function start() {
  try {
    await mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful')

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log('Cannot create connection to DB')
    console.log(err)
    process.exit(1)
  })
  } catch (error) {
    console.log(error)
  }
}
start();