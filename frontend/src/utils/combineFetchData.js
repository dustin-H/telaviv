import { generateObjectHash } from './hash.js'

export default (content, data) => {
  var out = [];
  for(var i in content){
    var obj = {};
    obj.component = content[i].component
    obj.data = data[content[i].component]
    obj.key = generateObjectHash(obj)
    out.push(obj)
  }
  return out;
}
