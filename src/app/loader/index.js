
import { setClassNameScope, getClassNameScope } from 'react-look-scope'
import { resolve } from 'path'

export function getComponent(id, config) {
  let oldscope = getClassNameScope()
  setClassNameScope(config.components[config.theme + '/' + id])
  let temp = require(resolve(config.buildPath, 'server', config.theme, id))
  setClassNameScope(oldscope)
  return temp
}
