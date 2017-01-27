var express = require('express')
var app = express()
var maba = require('maba');
var bot = new maba();
 
app.get('/ask', function (req, res) {
  var answer;
  var error;
  if (req.query.q) {
    answer = bot.ask(req.query.q);
  } else {
    error = "Sad! Don't understand this"; 
  }
  if (error) {
    res.status(400).json({error});
  } else {
    res.json({answer});
  }
  
});

app.use('/',express.static('public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(ip, port, function() {
  console.log("Listening on " + ip + ":" + port);
});
