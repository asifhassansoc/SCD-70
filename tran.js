var ethers = require("ethers");
var eth_abi = require('./eth_abi_js');
const providers = {
    // Mainnet Ethereum
    1: ethers.getDefaultProvider(1),
    4: new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/"),
    // Polygon
    137: new ethers.providers.JsonRpcProvider("https://polygon-rpc.com"), 
    80001: new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com"),
    // Avalanche
    43114: new ethers.providers.JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc"
    ),
  };

const pKey = "a7e3dbf6228fe21e26e99079b2bd370519fa9936227b23583aa3c16e0f6da77f";
// const pKey = new ethers.Wallet.createRandom();
const signer = new ethers.Wallet(pKey, providers[80001]);

const tx = {
    from: "0x88fD092FD6fc1968095E05Fae17053696AD2099F",
    to: "0x0FBd315BDd44F6a92B36DC32A9245B44f33B2cED",
    value: ethers.utils.parseEther("0.1"),
    // nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
    // gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    // gasPrice: gas_price,
  }

  let contract = new ethers.Contract(
    "0xD8642b10E68ba7771C968Bd0a68E3727470e8950",
    eth_abi,
    signer
  )
  console.log(contract, eth_abi)
  let numberOfTokens = ethers.utils.parseUnits("10", 18)
  contract.transfer("0x0FBd315BDd44F6a92B36DC32A9245B44f33B2cED", numberOfTokens).then((transferResult) => {
    console.dir(transferResult)
    console.log("sent token")
  })

//   signer.sendTransaction(tx).then((transaction) => {
//   console.dir(transaction)
//   console.log("Send finished!")
// })
