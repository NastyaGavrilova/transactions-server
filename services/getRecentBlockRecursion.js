const Transaction = require("../models/transactions");
const axios = require("axios");
require("dotenv").config();

const TOTAL_BLOCKS_IN_COLLECTION = 1000;
const BASE_URL = "https://api.etherscan.io";
axios.defaults.baseURL = `${BASE_URL}`;

const getRecentBlockNumber = require("./getRecentBlockNumber");
const removeOneBlock = require("./removeOneBlock");
const sleep = require("../utils/sleepFunction");
const getRecentBlock = require("./getRecentBlock");

const getRecentBlockRecursion = async() => {
  const recentBlockNumber = await getRecentBlockNumber();
  
  await getRecentBlock(recentBlockNumber);
  const oldestBlockerNumberDB = await Transaction.findOne({})
    .sort({ _id: 1 })
    .limit(1);
  const latestBlockerNumberDB = await Transaction.findOne({})
    .sort({ _id: -1 })
    .limit(1);

  if (
    oldestBlockerNumberDB.blockNumber <
    latestBlockerNumberDB.blockNumber - TOTAL_BLOCKS_IN_COLLECTION
  ) {
    removeOneBlock(oldestBlockerNumberDB.blockNumber);
    console.log(
      `!!! Oldest Block #${oldestBlockerNumberDB.blockNumber} removed`
    );
  }
  await sleep(200);
  return await getRecentBlockRecursion();
}
module.exports = getRecentBlockRecursion