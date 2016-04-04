

export default function() {
  return (req, res, next) => {
    /* istanbul ignore if */
    if (req.telaviv.timetracking != null) {
      var diff = process.hrtime(req.telaviv.timetracking.start);
      console.log('GET:', req.path, 'in', diff[1] / 1000000, 'Milliseconds!')
      console.log(' > ReactRender:', req.telaviv.timetracking.reactRenderTime, 'Milliseconds');
    }
    res.send(req.telaviv.html)
  }
}
