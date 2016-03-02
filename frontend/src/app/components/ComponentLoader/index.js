import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
import componentLoader from '../../../utils/componentLoader.js'

class ComponentLoader extends Component {
  render() {
    const {state, actions, data} = this.props
    const Comp = componentLoader(data.component)
    return (
      <Comp data={data.data} actions={actions}></Comp>
    );
  }
}

export default ComponentLoader
