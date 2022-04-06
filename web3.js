var web3 = require('web3');
var contract = require('web3-eth-contract');

let tokenAddress = "0xD8642b10E68ba7771C968Bd0a68E3727470e8950";
let toAddress = "0x88fD092FD6fc1968095E05Fae17053696AD2099F";
// Use BigNumber
// let decimals = web3.toBigNumber(18);
// let amount = web3.toBigNumber(100);
let minABI = [
  // transfer
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];
// Get ERC20 Token contract instance
let contract = web3.eth.contract(minABI).at(tokenAddress);
// calculate ERC20 token amount
// let value = amount.times(web3.toBigNumber(10).pow(decimals));
// call transfer function
contract.transfer(toAddress, 1, (error, txHash) => {
  // it returns tx hash because sending tx
  console.log(txHash);
});