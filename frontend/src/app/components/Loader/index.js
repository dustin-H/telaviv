import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
import { getComponent } from '../../loader'

class Loader extends Component {
  render() {
    const {state, actions, data} = this.props
    const Comp = getComponent(data.component) // lookConfig={{template: (className) => Comp.displayName + '-' + className}}
    return (
      <Comp data={ data.data } actions={ actions }></Comp>
      );
  }
}
export default Loader
