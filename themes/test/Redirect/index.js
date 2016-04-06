import React, { PropTypes, Component } from 'react'

class Redirect extends Component {
  render() {
    this.context.telaviv.changeLocation('/redirect/to')
    return (
      <div></div>
    )
  }
}

Redirect.contextTypes = {telaviv: React.PropTypes.object};

export default Redirect
