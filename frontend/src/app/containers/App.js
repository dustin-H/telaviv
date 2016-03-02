import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Content from '../components/Content';

import * as content from '../actions/content.js';

class App extends Component {
  render() {
    const {state, dispatch} = this.props;
    const actions = {
      content: bindActionCreators(content, dispatch)
    }

    return (<Content state={state} actions={actions}/>);
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
