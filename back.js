var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

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

 app.post('/addscore', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    ethadd : req.body.ethadd,
    score : req.body.score,
    steps : req.body.steps,
};
    console.log(record);
    let sql = "INSERT INTO scores SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
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

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    });