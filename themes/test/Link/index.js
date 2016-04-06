import React, { PropTypes, Component } from 'react'

class Link extends Component {
  render() {
    const ALink = this.context.telaviv.Link
    return (
      <div>
        <ALink to={ '/link/to' }>Link1</ALink>
        <ALink to={ '/not/link/to' }>Link2</ALink>
        <ALink to={ '/link/to' } className="link" activeClassName="link-active">Link3</ALink>
        <ALink to={ '/not/link/to' } className="link" activeClassName="link-active">Link4</ALink>
        <ALink to={ '/link/to' } style={ {color: 'red'} } activeStyle={ {color: 'blue'} }>Link5</ALink>
        <ALink to={ '/not/link/to' } style={ {color: 'red'} } activeStyle={ {color: 'blue'} }>Link6</ALink>
        <ALink to={ '/link/to' } style={ {} } activeStyle={ {} }>Link7</ALink>
        <ALink to={ '/not/link/to' } style={ {} } activeStyle={ {} }>Link8</ALink>
        <ALink to={ '/link/to' } activeClassName="link-active">Link9</ALink>
        <ALink to={ '/not/link/to' } activeClassName="link-active">Link10</ALink>
      </div>
    )
  }
}

Link.contextTypes = {telaviv: React.PropTypes.object};

export default Link
