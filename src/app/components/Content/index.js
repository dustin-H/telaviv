import React, { Component } from 'react'
import _map from 'lodash/map'
import Loader from '../Loader'
import * as telaviv from '../../telaviv'

class Content extends Component {
  getChildContext() {
    return {
      telaviv: telaviv,
      location: this.props.state.content.location
    }
  }
  render() {
    const {state, actions} = this.props
    return (
      <div>
        { _map(state.content.data, function(value, key) {
            return <Loader key={ value.key } data={ value } state={ state } actions={ actions }></Loader>
          }) }
      </div>
      );
  }
}

Content.childContextTypes = {
  telaviv: React.PropTypes.object,
  location: React.PropTypes.object
};


export default Content
