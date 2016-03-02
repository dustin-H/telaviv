
import { generateObjectHash } from '../utils/hash.js'

export default function create(data, req) {
  for (var i in data) {
    data[i].key = generateObjectHash(data[i])
  }

  var state = {
    content: {
      data: data
    },
    router: {
      location: {
        pathname: req.path
      }
    }
  }
  return state
}
