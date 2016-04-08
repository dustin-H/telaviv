
/*var config = require('./frontend/config')
console.log('config:', config)

config.update({lala: 'Größenwahn!'}, function(err) {
  if (err != null) {
    return console.error(err)
  }
  console.log(config)
})*/
var compression = require('compression');
var express = require('express')
var app = express()
// var morgan = require('morgan')

var config = require('./config.json')

var telaviv = require('./lib/index.js');
var testapi = require('./testapi.js');

app.listen(8000, function() {
  console.log('STARTED!');
})

// app.use(morgan('combined'))
app.use(compression());
app.get('/telaviv', function(req, res) {
  telaviv.setConfig(config)
  res.json(config)
})
app.use('/api', testapi())

app.use(telaviv.server(config))

app.use(function(req, res, next) {
  res.status(500).send('telaviv Failed 500')
})
