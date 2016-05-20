var express     = require('express');
var app         = express();
var server      = require('http').Server(app);

app.use(express.static('public'));

require('./app/routes.js')(app);

var config = {
  "domain":     process.env.OPENSHIFT_APP_DNS || '127.0.0.1',
  "serverip":   process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  "serverport": process.env.OPENSHIFT_NODEJS_PORT || '8080',
  "clientport": (process.env.OPENSHIFT_NODEJS_PORT) ? '8000':'8080'
};

server.listen(config.serverport, config.serverip, function() {
  console.log("Running @ http://" + config.serverip + ":" + config.serverport);
});