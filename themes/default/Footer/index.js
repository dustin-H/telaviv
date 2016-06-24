import React, { PropTypes, Component } from 'react'
import felaStylesConnector from 'fela-styles-connector'

import style from './style.js'

var connect = felaStylesConnector(style)

class Footer extends Component {
  render() {
    const {data, actions, styles} = this.props
    const Link = this.context.telaviv.Link
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

Footer.contextTypes = {
  telaviv: React.PropTypes.object
}

export default connect(Footer)
