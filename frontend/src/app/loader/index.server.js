
import config from '../../config'

export function getComponent(id) {
  return require('../../themes/' + config.theme + '/' + id)
}

export function ensureComponents(ids, cb) {
  throw new Error('Do not call loader/ensureComponents on the server-side!')
}

export function registerComponent(id, module) {
  throw new Error('Do not call loader/registerComponent on the server-side!')
}
