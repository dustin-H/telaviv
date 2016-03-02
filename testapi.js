var express = require('express')

module.exports = function() {
  var app = express()

  app.get('/header', function(req, res) {
    res.json({header: 'data'})
  })

  app.get('/article/:id', function(req, res) {
    res.json({acticle: 'Bla', id: req.params.id})
  })

  app.get('/footer', function(req, res) {
    res.json({footer: 'data'})
  })

  return app;
}
