

export default function() {
  return (req, res, next) => {
    /* istanbul ignore if */
    if (req.bauhaus.timetracking != null) {
      var diff = process.hrtime(req.bauhaus.timetracking.start);
      console.log('GET:', req.path, 'in', diff[1] / 1000000, 'Milliseconds!')
      console.log(' > ReactRender:', req.bauhaus.timetracking.reactRenderTime, 'Milliseconds');
    }
    res.send(req.bauhaus.html)
  }
}
