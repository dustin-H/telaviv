import React, { PropTypes, Component } from 'react'

class Active extends Component {
  render() {
    return (
      <div>
        { this.context.telaviv.isActive('/is/active') ? 'true' : 'false' }
      </div>
    )
  }
}

Active.contextTypes = {telaviv: React.PropTypes.object};

export default Active
