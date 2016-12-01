/**
 * @author Anthony Altieri on 11/28/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stats from './Stats';

class Alert extends Component {

  render() {
    return (
      <div className="full-pane">
        <div className="heading">
          <h2 className="header">ALERT</h2>
        </div>
        <div className="alert-graph">
        </div>
        <Stats />
      </div>
    );
  }
}
const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
});

Alert = connect(
  stateToProps,
  dispatchToProps,
)(Alert);
export default Alert;
