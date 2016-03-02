
var searchCache = function(moduleName, callback) {
	var mod = require.resolve(moduleName);
	if(mod && ((mod = require.cache[mod]) !== undefined)) {
		(function run(mod) {
			mod.children.forEach(function(child) {
				run(child);
			});
			callback(mod);
		})(mod);
	}
};

var uncache = function(moduleName) {
	searchCache(moduleName, function(mod) {
		delete require.cache[mod.id]
	});
	Object.keys(module.constructor._pathCache)
		.forEach(function(cacheKey) {
			if(cacheKey.indexOf(moduleName) > 0) {
				delete module.constructor._pathCache[cacheKey]
			}
		});
};

module.exports = uncache;
