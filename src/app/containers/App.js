import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Content from '../components/Content'
import IS_SERVER from '../../utils/isServer.js'

// Do not import actions on the server because they can't be called => Saves RAM!
let content = {}
/* istanbul ignore if */
if (!IS_SERVER) {
  content = require('../actions/content.js')
}

class App extends Component {
  render() {
    const {state, dispatch} = this.props;
    const actions = {
      content: bindActionCreators(content, dispatch)
    }

    return (<Content state={ state } actions={ actions } />);
  }
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {state: state};
}

export default connect(mapStateToProps)(App);
