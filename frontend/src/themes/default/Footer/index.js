import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'

class Footer extends Component {
  render() {
    const {data, actions} = this.props
    const Link = this.context.bauhaus.Link
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

Footer.contextTypes = {bauhaus: React.PropTypes.object};

export default look(Footer)
