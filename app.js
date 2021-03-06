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

app.get('/slackask', function (req, res) {
  var answer;
  var error;
  if (req.query.text) {
    answer = bot.ask(req.query.text);
  } else {
    error = "Sad! Don't understand this"; 
  }
  if (error) {
    res.status(400).send(error);
  } else {
    res.send(answer.response);
  }
});  

app.use('/',express.static('public'));

var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

if (ip) {
  app.listen(port, ip, function() {
    console.log("Listening on " + ip + ":" + port);
  });
} else {
  app.listen(port, function() {
    console.log("Listening on public ip at port " + port);
  });
}
