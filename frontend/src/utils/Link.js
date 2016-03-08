import React, { Component } from 'react'

function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

function isEmptyObject(object) {
  for (let p in object)
    if (object.hasOwnProperty(p))
      return false

  return true
}

function createLocationDescriptor(to, { query, hash, state }) {
  if (query || hash || state) {
    return { pathname: to, query, hash, state }
  }

  return to
}

class Link extends Component{

  /*contextTypes: {
    router: object
  },

  propTypes: {
    to: oneOfType([ string, object ]).isRequired,
    query: object,
    hash: string,
    state: object,
    activeStyle: object,
    activeClassName: string,
    onlyActiveOnIndex: bool.isRequired,
    onClick: func
  },*/

  getDefaultProps() {
    return {
      onlyActiveOnIndex: false,
      className: '',
      style: {}
    }
  }

  handleClick(event) {
    let allowTransition = true

    if (this.props.onClick)
      this.props.onClick(event)

    if (isModifiedEvent(event) || !isLeftClickEvent(event))
      return

    if (event.defaultPrevented === true)
      allowTransition = false

    // If target prop is set (e.g. to "_blank") let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) {
      if (!allowTransition)
        event.preventDefault()

      return
    }

    event.preventDefault()

    if (allowTransition) {
      const { to, query, hash, state } = this.props
      const location = createLocationDescriptor(to, { query, hash, state })

      this.context.router.push(location)
    }
  }

  render() {

  }

}

export default Link
