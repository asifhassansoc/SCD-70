var express = require('express');
import {Request, Response} from 'express';
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

import Moralis from 'moralis/node';

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scd67'
});

connection.connect();
console.log("Connect");

app.post('/adduser', (req: Request, res: Response) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    waletadd : req.body.waletadd,
    tokens : "0"
};
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, record, (err : new Error) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })


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
    const options : Moralis.TransferOptions = {
      type: "erc20",
      amount: Moralis.Units.Token("0", 18),
      receiver: "0x0FBd315BDd44F6a92B36DC32A9245B44f33B2cED",
      contractAddress: "0x0cdc56f9f7d2f29e859f7c8e1ffdce03114c02a7",
    };
    await Moralis.transfer(options).then((result) => {
      console.log(result);
    });
  };
  
//   tranx();

    var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        });