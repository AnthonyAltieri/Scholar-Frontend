/**
 * @author Anthony Altieri on 11/25/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as OverlayActions from '../../../../actions/Overlay';
import Ask from './Ask/Ask';
import Alert from './Alert/Alert';
import CourseSessionDialog from './CourseSessionDialog';

class DashCourse extends Component {
  render() {
    const {
      mode,
      isOverlayVisible,
      overlayType,
      hideOverlay,
    } = this.props;

    let content = null;
    switch (mode) {
      case 'MAIN': {
        content = (<p>main</p>);
        break;
      }

      case 'SETTINGS': {
        content = (<p>settings</p>);
        break;
      }

      case 'ASK': {
        content = (<Ask />);
        break;
      }

      case 'ALERT': {
        content = (<Alert />);
        break;
      }

      case 'ASSESS': {
        content = (<p>assess</p>);
        break;
      }

      default: {
        throw new Error(`Invalid Instructor Dash Mode: ${mode}`);
      }
    }

    return (
      <div>
        <CourseSessionDialog
          isOpen={!!isOverlayVisible && overlayType === 'COURSE_SESSION'}
          onStartClick={() => {
          }}
          onEndClick={() => {

          }}
          onCancelClick={() => { hideOverlay() }}
        />
        {content}
      </div>
    )
  };
};

const stateToProps = (state) => ({
  mode: state.Dash.Instructor.Course.Mode,
  isOverlayVisible: state.Overlay.isVisible,
  overlayType: state.Overlay.type,
});

const dispatchToProps = (dispatch) => ({
  hideOverlay: () => {
    dispatch(OverlayActions.clearOverlayType());
    dispatch(OverlayActions.hideOverlay());
  },
  showOverlay: (type) => {
    dispatch(OverlayActions.setOverlayType(type));
    dispatch(OverlayActions.showOverlay());
  },
});

DashCourse = connect(
  stateToProps,
  dispatchToProps,
)(DashCourse);

export default DashCourse;
