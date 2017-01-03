/**
 * @author Anthony Altieri on 11/28/16.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import StatBlock from '../StatBlock';
import Graph from './Graph';
import * as OverlayActions from '../../../../../actions/Loading';

class Alert extends Component {
  componentDidMount() {
    this.props.endLoading();
  }

  render() {
    const {numberInCourseSession, activeAlerts} = this.props;

    return (
      <div className="c">
        <div className="two-thirds-pane card">
          <Graph />
        </div>
        <div id="alertStats" className=" one-thirds-pane card">
          <div className="heading">
            <h2 className="header">STATS</h2>
          </div>
          <div
            className="r-center"
            style={{
              height: '75%',
            }}
          >

            <StatBlock
              name="ActiveAlerts"
              number={activeAlerts}
              isMini
            />
            <StatBlock
              name="Present"
              number={numberInCourseSession}
              isMini
            />
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  alertGraph: state.Graph.Alert.graph,
  numberInCourseSession : state.Course.Attendance.numberInCourseSession,
  activeAlerts : state.Graph.Alert.activeAlerts
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
