import React, { Component } from 'react'
import Look, { StyleSheet } from 'react-look'
import componentLoader from '../../../utils/componentLoader.js'
import * as bauhaus from '../../../utils/bauhaus.js'

class ComponentLoader extends Component {
  getChildContext() {
    return {bauhaus: bauhaus}
  }
  render() {
    const {state, actions, data} = this.props
    const Comp = componentLoader(data.component)
    return (
      <Comp data={data.data} actions={actions}></Comp>
      );
  }
}

ComponentLoader.childContextTypes = {
  bauhaus: React.PropTypes.object
};

export default ComponentLoader
