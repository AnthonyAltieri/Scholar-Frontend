/**
 * @author Anthony Altieri on 11/28/16.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Stats from './Stats';
import Graph from './Graph';
import * as OverlayActions from '../../../../../actions/Loading';

class Alert extends Component {
  componentDidMount() {
    this.props.endLoading();
  }

  render() {
    return (
      <div>
        <div id="lineChart">
          <Graph />
        </div>
        <Stats />
      </div>
    );
  }
}

const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
  endLoading: () => {
    dispatch(OverlayActions.endLoading());
  },
});

Alert = connect(
  stateToProps,
  dispatchToProps,
)(Alert);
export default Alert;
