import React, { PropTypes, Component } from 'react'

class RedirectWithCode extends Component {
  render() {
    this.context.telaviv.changeLocation('/redirect/to', 301)
    return (
      <div></div>
    )
  }
}

RedirectWithCode.contextTypes = {telaviv: React.PropTypes.object};

export default RedirectWithCode
