
import { _StyleContainer, Prefixer } from 'react-look'

let classes = {}

const plugin = {
  mode: 'force',
  plugin: function({styles, newProps}) {
    if (newProps != null && newProps.className != null && typeof newProps.className === 'string') {
      let classNames = newProps.className.split(' ')
      for (var i in classNames) {
        classes[classNames[i]] = true
      }
    }
    return styles
  }
}

let selectorRegExp = new RegExp(/^\.(([a-z]|[0-9])*)/i)

const selectorUsed = (selector) => {
  if(selector[0] !== '.'){
    return true
  }
  let match = selectorRegExp.exec(selector)
  if(match == null || match.length < 2){
    return true
  }
  let cl = match[1]
  if(classes[cl] === true){
    return true
  }
  return false
}

export { plugin };

export function reset(){
  for(var i in classes){
    classes[i] = false
  }
}

export function renderToString(prefixer = new Prefixer()) {

  let css = ''

  _StyleContainer.fonts.forEach(font => css += font)
  _StyleContainer.statics.forEach(staticStyles => css += staticStyles)

  _StyleContainer.selectors.forEach((styles, selector) => {
    if (selectorUsed(selector) === true) {
      css += selector + _StyleContainer._renderCSS(prefixer, styles)
    }
  })
  _StyleContainer.mediaQueries.forEach((selectors, query) => {
    css += '@media' + query + '{'
    selectors.forEach((styles, selector) => {
      if (selectorUsed(selector) === true) {
        css += selector + _StyleContainer._renderCSS(prefixer, styles)
      }
    })
    css += '}'
  })
  _StyleContainer.keyframes.forEach((frames, name) => {
    css += prefixer.getKeyframesPrefix().reduce((keyframes, prefix) => {
      keyframes += '@' + prefix + 'keyframes ' + name + _StyleContainer._renderCSS(prefixer, frames)
      return keyframes
    }, '')
  })

  reset()

  return css
}
