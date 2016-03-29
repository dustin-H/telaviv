
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
//var morgan = require('morgan')

var config = require('./config.json')

var bauhaus = require('./frontend/build/app.js');
var testapi = require('./testapi.js');

app.listen(8000, function(){
  console.log('STARTED!');
})

//app.use(morgan('combined'))

app.use('/api', testapi())

app.use(bauhaus(config))

app.use(function(req, res, next){
  res.status(500).send('Bauhaus Failed 500')
})
