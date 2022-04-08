var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

// import Moralis from 'moralis/node';
var Moralis = require('moralis/node');

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

app.post('/adduser', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    waletadd : req.body.waletadd,
    tokens : "0"
};
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })

 app.post('/addinvitation', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    userid : req.body.userid,
    invitehash : req.body.invitehash,
};
    let sql = "INSERT INTO invite SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })

app.post('/score', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
//   let record = {
//     ethadd : req.body.ethadd,
//     score : req.body.score,
//     steps : req.body.steps,
// };
//     console.log(record);
    connection.query(`SELECT * FROM users WHERE waletadd="${req.body.ethadd}"`, function (err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
      var token = result[0].tokens;
  let sql_user = `update users SET tokens=${token + req.body.score} where waletadd="${req.body.ethadd}"`;
      connection.query(sql_user, (err) => {
          if (err) throw err;
          res.end();
      });
    })
    // let sql = "INSERT INTO scores SET ?";
    // connection.query(sql, record, (err) => {
    //   if (err) throw err;
    //     res.end();
    //   });
    // res.end();
 })

 app.post('/withdraw',async function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let resp = await tranx(req.body.chain, req.body.mytoken, req.body.ethadd, req.body.conadd); 
//  tranx(req.body.chain, req.body.mytoken, req.body.ethadd, req.body.conadd);
    connection.query(`SELECT * FROM users WHERE waletadd="${req.body.ethadd}"`, function (err, result) {
      if (err) throw err;
      res.send(result);
      var token = result[0].tokens;
  let sql_user = `update users SET tokens=${token - req.body.mytoken} where waletadd="${req.body.ethadd}"`;
      connection.query(sql_user, (err) => {
          if (err) throw err;
          res.end();
      });
    })
 })

app.get('/getid', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM users WHERE waletadd="${req.query.ethadd}"`, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  })

app.get('/fetch', async function (req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
  connection.query("SELECT * FROM users", function (err, result) {
      if (err) throw err;
      res.send(result);
    });
})

app.get('/getinvitationid', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query("SELECT * FROM invite WHERE userid=" + req.query.userid, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  })

app.get('/getinvitation', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM invite WHERE invitehash="${req.query.inv}"`, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  })

app.get('/addtokens', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM users WHERE id="${req.query.id}"`, function (err, result) {
        if (err) throw err;
        res.send(result);
        var token = result[0].tokens;
    let sql_user = `update users SET tokens=${token + 1} where id=${req.query.id}`;
        connection.query(sql_user, (err) => {
            if (err) throw err;
            res.end();
        });
      })
  })

app.get('/getimage', async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    connection.query(`SELECT * FROM users WHERE waletadd="${req.query.ethadd}"`, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  })

var moralisSecret = "oK1EP6e4gPagutaRxYbCP8l8XgyqFBIK63FspD1EQGdo95qCauMhiml9PTH8ryQP";
var serverUrl = "https://lfvk6rjxnjql.usemoralis.com:2053/server";
var appId = "j7K9Jx6KmRjlpwWXiKfqv7T7rRuMxVaCVjHqm4EF"

const tranx = async (chain, amm, receiverAdd, contractAdd) => {
  console.log(chain , amm , receiverAdd,contractAdd);
    await Moralis.start({ serverUrl, appId, moralisSecret });
  
    // Enable web3
    await Moralis.enableWeb3({
        
        chainId: parseInt(chain),
        privateKey: "a7e3dbf6228fe21e26e99079b2bd370519fa9936227b23583aa3c16e0f6da77f",
      });
  
    // // sending 0.5 DAI tokens with 18 decimals on BSC mainnet
    const options = {
      type: "erc20",
      amount: Moralis.Units.Token(amm, 18),
      receiver: receiverAdd,
      contractAddress: contractAdd,
    };
     var result = await Moralis.transfer(options);
     console.log(result);
  };
  
  // tranx();

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    });