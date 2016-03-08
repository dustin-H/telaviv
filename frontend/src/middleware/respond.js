

export default function() {
  return (req, res, next) => {
    var diff = process.hrtime(req.bauhaus.time);
    console.log('GET:', req.path, 'in', diff[1] / 1000000, 'Milliseconds!')
    res.send(req.bauhaus.html)
  }
}
