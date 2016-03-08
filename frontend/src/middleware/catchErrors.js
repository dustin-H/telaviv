
import url from 'url'

export default function() {
  return (req, res, next, err) => {
    if (req.bauhaus.renderData == null) {
      res.status(req.bauhaus.errorCode)
      req.bauhaus.renderData = {errorCode: req.bauhaus.errorCode}
    }
    if(res.statusCode === 200){
      res.status(500)
      req.bauhaus.renderData = {errorCode: 500}
    }
    next()
  }
}
