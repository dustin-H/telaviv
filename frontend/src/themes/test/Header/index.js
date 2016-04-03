import React, { PropTypes, Component } from 'react'

class Header extends Component {
  render() {
    this.context.bauhaus.addToHead('<script>var SpecialScript = 42;</script>')
    return (
      <div></div>
    )
  }
}

Header.contextTypes = {bauhaus: React.PropTypes.object};

export default Header
