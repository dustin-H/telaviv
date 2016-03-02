
/*var config = require('./frontend/config')
console.log('config:', config)

config.update({lala: 'Größenwahn!'}, function(err) {
  if (err != null) {
    return console.error(err)
  }
  console.log(config)
})*/

var express = require('express')
var app = express()

var bauhaus = require('./frontend/build/app.js');
var testapi = require('./testapi.js');

app.listen(8000)

app.use('/api', testapi())

app.use(bauhaus())

app.use(function(req, res, next){
  res.status(404).send('Bauhaus Failed 404')
})
