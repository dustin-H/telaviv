
import { generateObjectHash } from '../utils/hash.js'

export default function create(data, req, config) {
  for (var i in data) {
    data[i].key = generateObjectHash(data[i])
  }

  var state = {
    content: {
      data: data,
      location: {
        pathname: req.path
      },
      loading: false
    },
    config: {
      routes: config.clientRoutes,
      components: config.components,
      theme: config.theme,
      buildPath: config.buildPath
    }
  }
  return state
}
