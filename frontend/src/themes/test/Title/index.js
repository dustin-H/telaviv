import React, { PropTypes, Component } from 'react'

class Title extends Component {
  render() {
    this.context.bauhaus.setTitle('SpecialTitle')
    return (
      <div></div>
    )
  }
}

Title.contextTypes = {bauhaus: React.PropTypes.object};

export default Title
