import React, { PropTypes, Component } from 'react'

class Active extends Component {
  render() {
    return (
      <div>
        { this.context.bauhaus.isActive('/is/active') }
      </div>
    )
  }
}

Active.contextTypes = {bauhaus: React.PropTypes.object};

export default Active
