import React, { PropTypes, Component } from 'react'
import look, { StyleSheet } from 'react-look'

class Article extends Component {
  render() {
    const {data, actions} = this.props
    this.context.bauhaus.setTitle('Article: ' + data.id)
    if (data.id === 'alli') {
      this.context.bauhaus.changeLocation('/lol/alligatoah')
    }
    if (data.id === 'google') {
      this.context.bauhaus.changeLocation('http://www.google.de/')
    }

    return (
      <article className={ styles.article }>
        { JSON.stringify(data) }
      </article>
    )
  }
}

import styleSheet from './style.js'
var styles = StyleSheet.create(styleSheet)

Article.contextTypes = {bauhaus: React.PropTypes.object};

export default look(Article)
