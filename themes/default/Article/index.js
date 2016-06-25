import React, { PropTypes, Component } from 'react'
import felaStylesConnector from 'fela-styles-connector'

import style from './style.js'

var connect = felaStylesConnector(style)

class Article extends Component {
  render() {
    const {data, actions, styles} = this.props
    this.context.telaviv.setTitle('Article: ' + data.id)
    if (data.id === 'alli') {
      this.context.telaviv.changeLocation('/lol/alligatoah')
    }
    if (data.id === 'google') {
      this.context.telaviv.changeLocation('http://www.google.de/')
    }

    return (
      <article className={ styles.article }>
        LULULULULU
        { JSON.stringify(data) }
      </article>
    )
  }
}

Article.contextTypes = {
  telaviv: React.PropTypes.object
}

export default connect(Article)
