const fs = require('fs-extra')
const path = require('path')

module.exports = function(content) {
  var p = this.resourcePath
  if (p.startsWith(TELAVIV.themesPath) === true && p.startsWith(TELAVIV.moduleCreatorsPath) !== true) {
    var exportPath = TELAVIV.serverExportPath + p.substr(TELAVIV.themesPath.length)
    //console.log('>>', p, exportPath)
    try {
      fs.ensureFileSync(exportPath)
      fs.writeFileSync(exportPath, content)
      //console.log('Wrote file', exportPath);
    } catch (e) {
      console.log('Failed to write file', exportPath, e);
    }
  }
  return content
};
