import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'

class Article extends Component {
  render() {
    const {data, actions} = this.props
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

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

Article.contextTypes = {telaviv: React.PropTypes.object};

export default look(Article)
