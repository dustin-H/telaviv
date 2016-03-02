
var fs = require('fs')
var file = 'config.json';

var m = {};

var config = JSON.parse(fs.readFileSync(file, 'utf8'));

var update = function(newConfig, cb) {
  var temp = Object.assign(config, newConfig)
  fs.writeFile(file, JSON.stringify(temp), function(err) {
    if (err != null) {
      return cb(err)
    }
    fs.readFile(file, 'utf8', function(err, latestConfig) {
      if (err != null) {
        return cb(err)
      }
      config = Object.assign(config, JSON.parse(latestConfig))
      cb(null);
    })
  })
}

config.update = update;

module.exports = config
