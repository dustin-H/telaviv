import React, { Component } from 'react'
import { getComponent } from '../../loader'

class Loader extends Component {
  render() {
    const {state, actions, data} = this.props
    const Comp = getComponent(data.component, state.config)
    return (
      <Comp data={ data.data } actions={ actions } options={ data.options || {} }></Comp>
      );
  }
}
export default Loader
