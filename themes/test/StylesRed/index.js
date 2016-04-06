import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'
import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

class StylesRed extends Component {
  render() {
    return (
      <div className={ styles.div }></div>
    )
  }
}


export default look(StylesRed)
