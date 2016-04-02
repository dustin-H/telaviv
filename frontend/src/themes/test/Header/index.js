import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'
import SomeText from './SomeText.js'

class Header extends Component {
  render() {
    const {data, actions} = this.props
    return (
      <header className={ styles.header }>
        My Header!<SomeText></SomeText>
      </header>
    )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

export default look(Header)
