import React, { PropTypes, Component } from 'react'

class Redirect extends Component {
  render() {
    this.context.bauhaus.changeLocation('/redirect/to')
    return (
      <div></div>
    )
  }
}

Redirect.contextTypes = {bauhaus: React.PropTypes.object};

export default Redirect
