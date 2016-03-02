import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
import _map from 'lodash/map'
import ComponentLoader from '../ComponentLoader'

class Content extends Component {
  render() {
    const {state, actions} = this.props
    return (
      <div>
       {_map(state.content.data, function(value, key) {
          return <ComponentLoader key={value.key} data={value} state={state} actions={actions}></ComponentLoader>
        })}
      </div>
    );
  }
}

export default Content
