import React, { PropTypes, Component } from 'react'

class Title extends Component {
  render() {
    this.context.telaviv.setTitle('SpecialTitle')
    return (
      <div></div>
    )
  }
}

Title.contextTypes = {telaviv: React.PropTypes.object};

export default Title
