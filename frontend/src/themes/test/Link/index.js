import React, { PropTypes, Component } from 'react'

class Link extends Component {
  render() {
    const ALink = this.context.bauhaus.Link
    return (
      <ALink to={'/link/to'}></ALink>
    )
  }
}

Link.contextTypes = {bauhaus: React.PropTypes.object};

export default Link
