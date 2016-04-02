
import config from '../../config'
import { setClassNameScope, getClassNameScope } from 'react-look-scope'

export function getComponent(id) {
  let oldscope = getClassNameScope()
  setClassNameScope(config.components[id])
  let temp = require('../../themes/' + config.theme + '/' + id)
  setClassNameScope(oldscope)
  return temp
}

export function ensureComponents(ids, cb) {
  throw new Error('Do not call loader/ensureComponents on the server-side!')
}

export function registerComponent(id, module) {
  throw new Error('Do not call loader/registerComponent on the server-side!')
}
