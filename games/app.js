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
  database: 'scd41'
});

connection.connect();
console.log("Connect");

app.post('/adduser', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    ethadd : req.body.ethadd,
    his : req.body.his,
};
    console.log(record);
    let sql = "INSERT INTO users SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      console.log(err);
        res.end();
      });
    res.end();
 })

 app.post('/clumsyscore', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    ethadd : req.body.ethadd,
    score : req.body.score,
    steps : req.body.steps,
};
    console.log(record);
    let sql = "INSERT INTO clumsy SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })

 app.post('/bublescore', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    ethadd : req.body.ethadd,
    score : req.body.score,
};
    console.log(record);
    let sql = "INSERT INTO buble SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })

 app.post('/hexscore', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    ethadd : req.body.ethadd,
    score : req.body.score,
};
    console.log(record);
    let sql = "INSERT INTO hextris SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })

 app.post('/tetrisscore', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  let record = {
    ethadd : req.body.ethadd,
    score : req.body.score,
};
    console.log(record);
    let sql = "INSERT INTO tetris SET ?";
    connection.query(sql, record, (err) => {
      if (err) throw err;
      // console.log(err);
        res.end();
      });
    res.end();
 })

// app.get('/fetch', async function (req, res) {
// res.setHeader('Access-Control-Allow-Origin', '*');
//   connection.query("SELECT * FROM users", function (err, result) {
//       if (err) throw err;
//       res.send(result);
//     });
// })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    });