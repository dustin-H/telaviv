
import { generateObjectHash } from '../utils/hash.js'
import config from '../config'

export default function create(data, req) {
  for (var i in data) {
    data[i].key = generateObjectHash(data[i])
  }

  var state = {
    content: {
      data: data,
      location: {
        pathname: req.path
      }
    },
    config: config
  }
  return state
}
