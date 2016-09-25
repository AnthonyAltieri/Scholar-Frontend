/**
 * @author Anthony Altieri on 9/5/16.
 */

import React, { Component } from 'react';
import { push } from 'react-router-redux';
// import Login from '../Login/Login.js';
// import Signup from '../Signup/Signup.js';

class Initial extends Component {
  componentDidMount() {
    const { store } = this.context;
    store.dispatch(push('/'));
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    })}

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    const view = state.View;

    switch (view) {
      default:
      case 'LOG_IN': {
        return (
          <div className="initial">
            <LogIn />
          </div>
        )
      }
      case 'SIGN_UP': {
        return (
          <div className="initial">
            <Signup />
          </div>
        )
      }
    }
  }
};
Initial.contextTypes = {
  store: React.PropTypes.object
};

export default Initial;
