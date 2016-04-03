import React, { PropTypes, Component } from 'react'

class Active extends Component {
  render() {
    return (
      <div>
        { this.context.bauhaus.isActive('/is/active') ? 'true' : 'false' }
      </div>
    )
  }
}

Active.contextTypes = {bauhaus: React.PropTypes.object};

export default Active
