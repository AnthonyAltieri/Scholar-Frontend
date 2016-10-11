/**
 * @author Anthony Altieri on 10/3/16.
 */

import React, { Component } from 'react';
import Nav from './Nav';
import { connect } from 'react-redux';
import * as LoadingActions from '../../../actions/Loading'
import * as CourseSessionActions from '../../../actions/CourseSession'
import Overlay from './Overlay';

class DashInstructor extends Component {
  componentDidMount() {
    const { endLoading } = this.props;
    endLoading();
  }

  render() {
    const { children, dispatch, isOverlayVisible, courseCode,
      hasCourseSession, startedCourseSession, courseId,
      endedCourseSession,
    } = this.props;
    return (
      <div className="dash-instructor">
        {isOverlayVisible
          ? <Overlay
            courseId={courseId}
            dispatch={dispatch}
            hasCourseSession={hasCourseSession}
            startedCourseSession={startedCourseSession}
            endedCourseSession={endedCourseSession}
          />
          : null}
        <Nav
          dispatch={dispatch}
          courseCode={courseCode}
          hasCourseSession={hasCourseSession}
        />
        {children}
      </div>
    );
  }
}

const stateToProps = (state) => ({
  promptEndSession: state.DashInstructor.promptEndSession,
  isSessionActive: state.CourseSession.isActive,
  isOverlayVisible: state.Overlay.isVisible,
  hasCourseSession: state.CourseSession.active,
  courseId: state.Course.id,
  courseCode: state.Course.code,
});
const dispatchToProps = (dispatch) => ({
  endLoading: () => {
    dispatch(LoadingActions.endLoading());
  },
  startedCourseSession: (id) => {
    dispatch(CourseSessionActions.startedCourseSession(id))
  },
  endedCourseSession: () => {
    dispatch(CourseSessionActions.endedCourseSession());
  },
  dispatch,

});

DashInstructor = connect(
  stateToProps,
  dispatchToProps
)(DashInstructor);


export default DashInstructor;
