const converter = require("ether-converter");
const hexToDec = require("./hexToDec");

const weiToEth = (value) => {
  const wei = hexToDec(value);
  const ether = converter(wei, "wei");
  return Number(ether.ether).toFixed(14);
}
module.exports = weiToEth;