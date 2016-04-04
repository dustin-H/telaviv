
import { setClassNameScope, getClassNameScope } from 'react-look-scope'

export function getComponent(id, config) {
  let oldscope = getClassNameScope()
  setClassNameScope(config.components[id])
  let temp = require('../../themes/' + config.theme + '/' + id)
  setClassNameScope(oldscope)
  return temp
}
