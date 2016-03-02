
module.exports = function(content, data){
  var out = [];
  for(var i in content){
    var obj = {};
    obj.component = content[i].component
    obj.data = data[content[i].component]
    out.push(obj)
  }
  return out;
}
