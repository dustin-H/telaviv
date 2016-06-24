
import { resolve } from 'path'

export function getComponent(id, config) {
  let temp = require(resolve(config.buildPath, 'server', config.theme, id))
  return temp
}
