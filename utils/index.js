const sleepFunction = require('./sleepFunction');
const hexToDec = require('./hexToDec');
const decToHex = require('./decToHex');
const convertDate = require('./converDate');
const weiToEth = require('./weiToEth');
const transactionFeeCalculator = require('./transactionFee');

module.exports = {
  convertDate,
  decToHex,
  hexToDec,
  sleepFunction,
  transactionFeeCalculator,
  weiToEth,
}