import React, { PropTypes, Component } from 'react'

class Header extends Component {
  render() {
    this.context.telaviv.addToHead('<script>var SpecialScript = 42;</script>')
    return (
      <div></div>
    )
  }
}

Header.contextTypes = {telaviv: React.PropTypes.object};

export default Header
