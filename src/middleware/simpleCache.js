
import parseCacheControl from 'parse-cache-control'
const cache = {}

const canCache = (res) => {
  if (res.statusCode !== 200) {
    return false
  }
  let cc = res.get('cache-control')
  if (cc == null || typeof cc !== 'string') {
    console.log('HAHA', 1);
    return false
  }
  let header = parseCacheControl(cc)
  if (header['must-revalidate'] === true || header['no-cache'] === true || header['no-store'] === true || header.private === true) {
    console.log('HAHA', 2);
    return false
  }
  if (header['max-age'] != null && typeof header['max-age'] === 'number') {
    return 1000 * header['max-age']
  }
  console.log('HAHA', 3, header);
  return false // default => No cache!
}

export default function() {
  return (req, res, next) => {
    if (cache[req.url] != null) {
      let entry = cache[req.url]
      if (entry.t > Date.now()) {
        for (var i in entry.h) {
          res.set(i, entry.h[i])
        }
        console.log('FROM CACHE');
        return res.send(entry.b)
      } else {
        delete cache[req.url]
      }
    }
    res.sendTelavivCache = (data) => {
      let time = canCache(res)
      if (time !== false) {
        console.log('WRITE CACHE', req.url);
        cache[req.url] = {
          b: data,
          h: JSON.parse(JSON.stringify(res._headers)),
          t: Date.now() + time
        }
      }
      res.send(data)
    }
    next()
  }
}
