import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
import { getComponent } from '../../loader'

class Loader extends Component {
  render() {
    const {state, actions, data} = this.props
    const Comp = getComponent(data.component, state.config) // lookConfig={{template: (className) => Comp.displayName + '-' + className}}
    return (
      <Comp data={ data.data } actions={ actions } options={ data.options || {} }></Comp>
      );
  }
}
export default Loader
