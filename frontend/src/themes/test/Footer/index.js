import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'
import Link from '../../../utils/Link.js'

class Footer extends Component {
  render() {
    const {data, actions} = this.props
    return (
      <footer className={ styles.footer }>
        My footer!
        <Link to={ '/lol/bluuuubbb' } className={ styles.link } activeClassName={ styles.activeLink }>HAHA</Link>
        <br/>
        <Link to={ '/lol/hihihih' } className={ styles.link } activeClassName={ styles.activeLink }>BACK</Link>
        <br/>
        <Link to={ '/does/not/exist' } className={ styles.link } activeClassName={ styles.activeLink }>Does not exist</Link>
      </footer>
    )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

export default look(Footer)
