const Transaction = require("../models/transactions");

const removeOneBlock = async (oldestBlockNumberDB) => {
  console.log(`Removing ${oldestBlockNumberDB} block...`)
  return await Transaction.deleteMany({
    blockNumber: oldestBlockNumberDB,
  })
}
module.exports = removeOneBlock;