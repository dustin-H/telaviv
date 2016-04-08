import { generateObjectHash } from './hash.js'
import { objectReplacer } from './replace.js'

export default (content, data, params) => {
  var out = [];
  for (var i in content) {
    var obj = {};
    obj.component = content[i].component
    obj.i = i
    obj.options = content[i].options || {}
    obj.options = JSON.parse(JSON.stringify(obj.options))
    obj.options = objectReplacer(obj.options, params)
    obj.data = data[content[i].component] || {}
    obj.key = generateObjectHash(obj)
    out.push(obj)
  }
  return out;
}
