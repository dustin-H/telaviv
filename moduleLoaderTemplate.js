var r = require("react-look-scope")
var t = r.getClassNameScope()
r.setClassNameScope(__GLOBAL__.INITIAL_STATE.config.components["${ theme }/${ name }"])
__GLOBAL__.exportDefault = require("${ path }")
r.setClassNameScope(t)
