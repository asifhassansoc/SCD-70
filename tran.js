// import Moralis from 'moralis/node';
var Moralis = require('moralis/node');

var moralisSecret = "oK1EP6e4gPagutaRxYbCP8l8XgyqFBIK63FspD1EQGdo95qCauMhiml9PTH8ryQP";
var serverUrl = "https://lfvk6rjxnjql.usemoralis.com:2053/server";
var appId = "j7K9Jx6KmRjlpwWXiKfqv7T7rRuMxVaCVjHqm4EF"

const tranx = async () => {
    await Moralis.start({ serverUrl, appId, moralisSecret });
  
    // Enable web3
    await Moralis.enableWeb3({
        //BSC mainnet
        chainId: 80001,
        privateKey: "a7e3dbf6228fe21e26e99079b2bd370519fa9936227b23583aa3c16e0f6da77f",
      });
  
    // sending 0.5 DAI tokens with 18 decimals on BSC mainnet
    const options = {
      type: "erc20",
      amount: Moralis.Units.Token("5", 18),
      receiver: "0x0FBd315BDd44F6a92B36DC32A9245B44f33B2cED",
      contractAddress: "0xD8642b10E68ba7771C968Bd0a68E3727470e8950",
    };
    await Moralis.transfer(options).then((result) => {
      console.log(result);
    });
  };
  
  tranx();