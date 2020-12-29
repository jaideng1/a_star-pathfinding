var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = 3000;

var players = [];


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/parser', function(req, res) {
  res.sendFile(__dirname + '/public/mazeparser/mazeparser.html');
})

app.get('/node.js', function(req, res) {
  res.sendFile(__dirname + '/public/node.js');
})

app.get('/script.js', function(req, res) {
  res.sendFile(__dirname + '/public/script.js');
})

app.get('/mazeparser.js', function(req, res) {
  res.sendFile(__dirname + '/public/mazeparser/mazeparser.js');
})

// start the server
app.listen(port, () => {
  console.log('Server started! At http://localhost:' + port);
});
