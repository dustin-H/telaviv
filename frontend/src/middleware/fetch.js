
import fetch from '../fetch'
import { generateObjectHash } from '../utils/hash.js'

const combineFetchData = (content, data) => {
  var out = [];
  for(var i in content){
    var obj = {};
    obj.component = content[i].component
    obj.data = data[content[i].component]
    obj.key = generateObjectHash(obj)
    out.push(obj)
  }
  return out;
}


export default function() {
  return (req, res, next) => {
    if (req.bauhaus.fetch == null) {
      return next(true)
    }
    fetch(req.bauhaus.fetch, req, res, function(err, data) {
      if (err != null) {
        res.status(err.status)
        return next(err)
      }
      req.bauhaus.fetch.data = combineFetchData(req.bauhaus.fetch.components, data)
      next()
    })
  }
}
