const converter = require("ether-converter");
const hexToDec = require("./hexToDec");

function transactionFeeCalculator(gas, gasPrice) {
  const weiGasLimit = hexToDec(gas);
  const weiGasPrice = hexToDec(gasPrice);
  const transactionFee = weiGasLimit * weiGasPrice;

  const transFeeToEth = converter(transactionFee, "wei");

  return Number(transFeeToEth.ether).toFixed(9);
}
module.exports = transactionFeeCalculator;
