import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
import _map from 'lodash/map'
import Loader from '../Loader'
import * as bauhaus from '../../bauhaus'

class Content extends Component {
  getChildContext() {
    return {
      bauhaus: bauhaus,
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
  bauhaus: React.PropTypes.object,
  location: React.PropTypes.object
};


export default Content
