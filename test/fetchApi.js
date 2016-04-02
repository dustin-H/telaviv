
import express from 'express'

export default (port = 4217, done) => {
  let app = express()
  // Fetch test with parameter
  app.get('/mirror/:id', (req, res) => res.json({
    test: 'mirror',
    id: req.params.id,
    headers: req.headers
  }))
  // Fetch test with error
  app.get('/error/:code', (req, res) => {
    if (req.query.time == null) {
      req.query.time = 0
    }
    setTimeout(() => {
      res.status(parseInt(req.params.code, 10))
      res.json({test: 'error'})
    }, req.query.time)
  })
  // Fetch test with Cache-Control
  app.get('/cache/:value', (req, res) => {
    res.set('Cache-Control', req.params.value)
    res.json({test: 'cache'})
  })
  // Fetch test set cookie
  app.get('/cookie/:key/:value', (req, res) => {
    res.cookie(req.params.key, req.params.value);
    res.json({test: 'cookie'})
  })

  app.listen(port, done)
}
