import React, { PropTypes, Component } from 'react'
import felaStylesConnector from 'fela-styles-connector'

import style from './style.js'

var connect = felaStylesConnector(style)

class StylesRed extends Component {
  render() {
    const { styles } = this.props
    return (
      <div className={ styles.div }></div>
    )
  }
}


export default connect(StylesRed)
