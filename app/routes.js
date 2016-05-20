var en5 = require('./db/english/jlpten5.js');
var en4 = require('./db/english/jlpten4.js');
var en3 = require('./db/english/jlpten3.js');
var en2 = require('./db/english/jlpten2.js');

var ko3 = require('./db/korean/jlptko3.js');
var ko2 = require('./db/korean/jlptko2.js');

var fr5 = require('./db/french/jlptfr5.js');
var fr4 = require('./db/french/jlptfr4.js');
var fr3 = require('./db/french/jlptfr3.js');
var fr2 = require('./db/french/jlptfr2.js');

module.exports = function(app){

app.get('/', function (req, res) {
  res.send('index');
});

app.get('/en', function (req, res) {
  res.send({L5:en5,
  			L4:en4,
  			L3:en3,
  			L2:en2});
});

app.get('/ko', function (req, res) {
  res.send({
  			L3:ko3,
  			L2:ko2});
});

app.get('/fr', function (req, res) {
  res.send({L5:fr5,
  			L4:fr4,
  			L3:fr3,
  			L2:fr2});
});

}