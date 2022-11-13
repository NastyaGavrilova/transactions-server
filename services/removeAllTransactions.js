const Transaction = require("../models/transactions");

async function deleteAllTransactions() {
  await Transaction.deleteMany({})
  const count = await Transaction.count()
  return console.log(
    `success, all transactions deleted. Collection count = ${count}`,
  )
}
module.exports = deleteAllTransactions