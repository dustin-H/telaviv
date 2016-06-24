import React, { PropTypes, Component } from 'react'
import felaStylesConnector from 'fela-styles-connector'

import SomeText from './SomeText.js'
import style from './style.js'

var connect = felaStylesConnector(style)

class Header extends Component {
  render() {
    const {data, actions, styles} = this.props
    return (
      <header className={ styles.header }>
        My Header!<SomeText></SomeText>
      </header>
    )
  }
}

export default connect(Header)
