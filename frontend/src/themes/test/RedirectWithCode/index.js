import React, { PropTypes, Component } from 'react'

class RedirectWithCode extends Component {
  render() {
    this.context.bauhaus.changeLocation('/redirect/to', 301)
    return (
      <div></div>
    )
  }
}

RedirectWithCode.contextTypes = {bauhaus: React.PropTypes.object};

export default RedirectWithCode
