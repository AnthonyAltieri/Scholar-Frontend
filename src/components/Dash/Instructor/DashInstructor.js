/**
 * @author Anthony Altieri on 10/3/16.
 */

import React, { Component } from 'react';
import Nav from './Nav/Nav';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as LoadingActions from '../../../actions/Loading'
import * as CourseSessionActions from '../../../actions/CourseSession'
import * as ModeActions from '../../../actions/DashInstructor/Course/Mode'
import * as OverlayActions from '../../../actions/Overlay';


class DashInstructor extends Component {
  componentDidMount() {
    const { endLoading } = this.props;
    endLoading();
  }

  render() {
    const {
      children,
      pathname,
      isCourseSessionActive,
      courseAbbreviation,
      courseId,
      setMode,
      showOverlay,
      navigate,
    } = this.props;
    return (
      <div className="dash-instructor">
        <Nav
          courseAbbreviation={courseAbbreviation}
          isCourseSessionActive={isCourseSessionActive}
          pathname={pathname}
          navigate={navigate}
          courseId={courseId}
          setMode={setMode}
          showOverlay={showOverlay}
        />
        {children}
      </div>
    );
  }
}

const stateToProps = (state) => ({
  // promptEndSession: state.Dash.Instructor.promptEndSession,
  // isSessionActive: state.CourseSession.isActive,
  // isOverlayVisible: state.Overlay.isVisible,
  // hasCourseSession: state.CourseSession.active,
  courseId: !!state.User.inCourse ? state.User.inCourse.id : null,
  isCourseSessionActive: !!state.User.inCourse
    ? state.User.inCourse.activeCourseSessionId : null,
  courseAbbreviation: !!state.User.inCourse
    ? state.User.inCourse.abbreviation : null,
  pathname: state.routing.locationBeforeTransitions.pathname,
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
  setMode: (mode) => {
    dispatch(ModeActions.setMode(mode));
  },
  navigate: (url) => {
    dispatch(push(url));
  },
  showOverlay: (type) => {
    dispatch(OverlayActions.setOverlayType(type));
    dispatch(OverlayActions.showOverlay());
  }

});

DashInstructor = connect(
  stateToProps,
  dispatchToProps
)(DashInstructor);


export default DashInstructor;
