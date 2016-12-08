/**
 * @author Anthony Altieri on 11/28/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stats from './Stats';
import Graph from './Graph';

class Alert extends Component {

  render() {
    return (
      <div className="full-pane">
        <div className="heading">
          <h2 className="header">ALERT</h2>
        </div>
        <div className="alert-graph">
        </div>
        <Graph
          graphData={[
            20, 20, 30, 50, 10, 40, 60, 10, 10, 20
          ]}
        />
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
