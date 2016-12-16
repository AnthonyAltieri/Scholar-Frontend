/**
 * @author Anthony Altieri on 11/25/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as OverlayActions from '../../../../actions/Overlay';
import * as CourseActions from '../../../../actions/Dash/Courses/Courses';
import * as InstantActions from '../../../../actions/Assess/Instant';
import { startCourseSession, endCourseSession } from '../../../../api/CourseSession';
import Socket from '../../../../socket/Socket'
import Events from '../../../../socket/Events';
import Ask from './Ask/Ask';
import Alert from './Alert/Alert';
import Assess from './Assess/Assess';
import QuestionBank from './QuestionBank/QuestionBank';
import CourseSessionDialog from './CourseSessionDialog';

async function handleCourseSessionStart(
  courseId,
  instructorId,
) {
  try {
    return await startCourseSession(courseId, instructorId);
  } catch (e) {
    console.error('[ERROR] handleCourseSessionStart', e);
    return null;
  }
}

async function handleCourseSessionEnd(
  courseId,
  instructorId,
) {
  try {
    return await endCourseSession(courseId, instructorId);
  } catch (e) {
    console.error('[ERROR] handleCourseSessionEnd', e);
    return null;
  }
}

function handleSockets(props) {
  const {
    courseSessionId,
  } = props;
  const courseSessionChannel = `private-${courseSessionId}`;
  Socket.subscribe(courseSessionChannel);
  Socket.bind(
    courseSessionChannel,
    Events.INSTANT_ASSESSMENT_ANSWERED,
    (data) => {

    }
  )

}

class DashCourse extends Component {
  componentDidMount() {
    if (this.props.isCourseSessionActive) {
      handleSockets(this.props);
    }
  }


  render() {
    const {
      mode,
      isOverlayVisible,
      overlayType,
      hideOverlay,
      userId,
      params,
      activateCourseSession,
      deactivateCourseSession,
    } = this.props;

    const { courseId } = params;

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
        content = (<Assess />);
        break;
      }

      case 'QUESTION_BANK': {
        content = (<QuestionBank courseId={courseId} />)
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
            handleCourseSessionStart(courseId, userId)
              .then(({ error, courseSessionId }) => {
                if (!!error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                hideOverlay();
                activateCourseSession(courseSessionId);
              })
              .catch(() => {
                toastr.error('Something went wrong please try again');
              });
          }}
          onEndClick={() => {
            handleCourseSessionEnd(courseId, userId)
              .then(({ error }) => {
                if (!!error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                hideOverlay();
                deactivateCourseSession();
              })
              .catch(() => {
                toastr.error('Something went wrong please try again');
              });
          }}
          onCancelClick={() => { hideOverlay(); }}
        />
        {content}
      </div>
    );
  }
}

const stateToProps = state => ({
  mode: state.Dash.Instructor.Course.Mode,
  isOverlayVisible: state.Overlay.isVisible,
  overlayType: state.Overlay.type,
  userId: state.User.id,
  isCourseSessionActive: !!state.Course.activeCourseSessionId,
  courseSessionId: state.Course.activeCourseSessionId,
});

const dispatchToProps = (dispatch, ownProps) => ({
  hideOverlay: () => {
    dispatch(OverlayActions.clearOverlayType());
    dispatch(OverlayActions.hideOverlay());
  },
  showOverlay: (type) => {
    dispatch(OverlayActions.setOverlayType(type));
    dispatch(OverlayActions.showOverlay());
  },
  deactivateCourseSession: () => {
    dispatch(CourseActions.deactivateCourse(ownProps.params.courseId));
  },
  activateCourseSession: (courseSessionId) => {
    dispatch(CourseActions.activateCourse(ownProps.params.courseId, courseSessionId));
    handleSockets(ownProps)
  },
  instantAnswerReceived: (userId, optionIndex) => {
    dispatch(InstantActions.answerReceived(userId, optionIndex));
  },
});

DashCourse = connect(
  stateToProps,
  dispatchToProps,
)(DashCourse);

export default DashCourse;
