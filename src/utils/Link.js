
/*
This is a modified version of [react-router Link](https://github.com/reactjs/react-router/blob/master/modules/Link.js)

Thanks to all contributors!

Great work!



LICENSE:

The MIT License (MIT)

Copyright (c) 2015 Ryan Florence, Michael Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify,
 merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React from 'react'
import look from 'react-look'

const {bool, object, string, func, oneOfType} = React.PropTypes

function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

function isEmptyObject(object) {
  for (let p in object) {
    /* istanbul ignore else => No need to test this because it's testet in react-router  */
    if (object.hasOwnProperty(p)) {
      return false
    }
  }

  return true
}

/**
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * For example, assuming you have the following route:
 *
 *   <Route path="/posts/:postID" component={Post} />
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 *
 * Links may pass along location state and/or query string parameters
 * in the state/query props, respectively.
 *
 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
 */
const Link = React.createClass({

  contextTypes: {
    telaviv: object
  },

  propTypes: {
    to: oneOfType([string]).isRequired,
    activeStyle: object,
    activeClassName: string,
    onClick: func
  },

  getDefaultProps() {
    return {className: '', style: {}}
  },

  handleClick(event) {
    let allowTransition = true

    /* istanbul ignore if => No need to test this because it's testet in react-router  */
    if (this.props.onClick) {
      this.props.onClick(event)
    }
    /* istanbul ignore if => No need to test this because it's testet in react-router  */
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }
    /* istanbul ignore if => No need to test this because it's testet in react-router  */
    if (event.defaultPrevented === true) {
      allowTransition = false
    }

    // If target prop is set (e.g. to "_blank") let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) {
      if (!allowTransition) {
        event.preventDefault()
      }

      return
    }

    event.preventDefault()

    /* istanbul ignore else => No need to test this because it's testet in react-router  */
    if (allowTransition) {
      const {to} = this.props

      this.context.telaviv.changeLocation(to)
    }
  },

  render() {
    const {to, activeClassName, activeStyle, ...props} = this.props

    // Ignore if rendered outside the context of router, simplifies unit testing.
    const {telaviv} = this.context
    props.href = to

    if (activeClassName || (activeStyle != null && !isEmptyObject(activeStyle))) {
      if (telaviv.isActive(to)) {
        if (activeClassName) {
          props.className += props.className === '' ? activeClassName : ` ${activeClassName}`
        }

        if (activeStyle) {
          props.style = {
            ...props.style,
            ...activeStyle
          }
        }
      }
    }

    return <a {...props} onClick={ this.handleClick } />
  }

})

export default look(Link)
