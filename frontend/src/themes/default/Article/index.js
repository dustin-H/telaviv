import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'

class Header extends Component {
  render() {
    const {data, actions} = this.props
    return (
      <article className={styles.article}>{JSON.stringify(data)}</article>
    )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

export default look(Header)
