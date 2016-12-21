/**
 * @author Anthony Altieri on 11/25/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as OverlayActions from '../../../../actions/Overlay';
import * as CourseActions from '../../../../actions/Dash/Courses/Courses';
import * as InstantActions from '../../../../actions/Assess/Instant';
import * as AlertActions from '../../../../actions/Alert';
import * as ReflectiveActions from '../../../../actions/Assess/Reflelctive';
import * as SocketActions from '../../../../actions/Socket';
import * as QuestionListActions from '../../../../actions/QuestionList';
import * as AttendanceActions from '../../../../actions/Attendance';
import { numberInCourseSessionGet, getNumberInAttendance } from '../../../../api/CourseSession';
import { startCourseSession, endCourseSession } from '../../../../api/CourseSession';
import Socket from '../../../../socket/Socket'
import Events from '../../../../socket/Events';
import Ask from './Ask/Ask';
import Alert from './Alert/Alert';
import Graph from './Alert/Graph';
import Assess from './Assess/Assess';
import QuestionBank from './QuestionBank/QuestionBank';
import CourseSessionDialog from './CourseSessionDialog';
import AttendanceDialog from './AttendanceDialog'
import { getAlerts, INTERVAL_TIME } from '../../../../util/AlertGraph'


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
    instantAnswerReceived,
    reflectiveAssessmentReviewed,
    reflectiveAssessmentAnswered,
    userId,
    addVote,
    removeVote,
    addQuestion,
    removeQuestion,
    addResponse,
    removeResponse,
    addFlag,
    removeFlag,
    handleStudentJoinedAttendance,
    studentJoinedCourseSession
  } = props;
  const courseSessionChannel = `private-${courseSessionId}`;
  Socket.subscribe(courseSessionChannel);
  Socket.bind(
    courseSessionChannel,
    Events.INSTANT_ASSESSMENT_ANSWERED,
    (data) => {
      instantAnswerReceived(
        data.userId,
        data.optionIndex
      )
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.REFLECTIVE_ASSESSMENT_REVIEWED,
    (data) => {
      reflectiveAssessmentReviewed();
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.REFLECTIVE_ASSESSMENT_ANSWERED,
    (data) => {
      reflectiveAssessmentAnswered();
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.QUESTION_ASKED,
    (data) => { addQuestion(data.question) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.RESPONSE_ADD,
    (data) => { addResponse(data.resposne) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.RESPONSE_REMOVED,
    (data) => { removeResponse(data.id) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.VOTE_ADD,
    (data) => {
      if (data.vote.userId === userId) return;
      addVote(
        data.targetId,
        data.vote,
      )
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.VOTE_REMOVE,
    (data) => {
      if (data.userId === userId) return;
      removeVote(data.id, data.userId)
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.ADD_FLAG,
    (data) => { addFlag(data.id) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.REMOVE_FLAG,
    (data) => { removeFlag(data.id) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.STUDENT_JOINED_COURSESESSION,
    (data) => studentJoinedCourseSession(data.numberInCourseSession),
  );
  Socket.bind(
    courseSessionChannel,
    Events.STUDENT_JOINED_ATTENDANCE,
    (data) => {
      handleStudentJoinedAttendance(data.attendance);
    }
  );
  console.log('pusher', Socket.getPusher());
}

class DashCourse extends Component {
  async componentDidMount() {
    const {
      courseSessionId,
      studentJoinedCourseSession,
      handleStudentJoinedAttendance
    } = this.props;
    if (this.props.isCourseSessionActive) {
      handleSockets(this.props);
      let {
        numberInCourseSession,
        error,
      } = await numberInCourseSessionGet(courseSessionId);
      if (!error) {
        studentJoinedCourseSession(numberInCourseSession);
      }


      const payload =  await getNumberInAttendance(courseSessionId);
      error = payload.error;
      let numberInAttendance = payload.attendance;
      if (!error) {
        handleStudentJoinedAttendance(numberInAttendance);
      }
    }
    const { updateAlertGraph, alertGraph, numberAttendees } = this.props;
    window.intervalGetAlerts =  window.setInterval( async () => {
      try {
        let alerts = await getAlerts(courseSessionId);
        updateAlertGraph(alerts, numberAttendees, alertGraph);
      } catch (e) {
        console.error("[ERROR] in DashCourse Component > ComponentDidMount : " + e)
      }
    }, INTERVAL_TIME);
  }
  componentWillUnmount() {
    Socket.disconnect();
    window.clearInterval(window.intervalGetAlerts);
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
      alertGraph,
      isCourseSessionActive,
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
        content = (<Graph />);
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
          isCourseSessionActive={isCourseSessionActive}
          onStartClick={() => {
            handleCourseSessionStart(courseId, userId)
              .then(({ error, courseSessionId }) => {
                if (!!error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                hideOverlay();
                activateCourseSession(courseSessionId);
                handleSockets(this.props);
              })
              .catch((e) => {
                console.error('[ERROR] handleCourseSessionStart', e);

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

        <AttendanceDialog
          isOpen={!!isOverlayVisible && overlayType === 'ATTENDANCE'}
          onStartClick={() => {
            console.log("Start click");
          }}
          onEndClick={() => {
           console.log("End click")
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
  alertGraph: state.Graph.Alert.graph,
  numberAttendees: state.Course.Attendance.numberAttendees,
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
    window.clearInterval(window.intervalGetAlerts);
  },
  updateAlertGraph: (activeAlerts, attendance, graph) => {
    dispatch(AlertActions.receivedActiveAlerts(activeAlerts, attendance, graph));
   },
  activateCourseSession: async (courseSessionId) => {
    dispatch(CourseActions.activateCourse(ownProps.params.courseId, courseSessionId));
    handleSockets(ownProps)
  },
  instantAnswerReceived: (userId, optionIndex) => {
    dispatch(InstantActions.answerReceived(userId, optionIndex));
  },
  reflectiveAssessmentReviewed: () => {
    dispatch(ReflectiveActions.reflectiveAssessmentReviewed());
  },
  reflectiveAssessmentAnswered: () => {
    dispatch(ReflectiveActions.answered());
  },
  addQuestion: (question) => {
    const {
      id,
      content,
      created,
      userId,
    } = question;
    dispatch(
      QuestionListActions
        .addQuestion(id, content, userId, created, 0, [])
    );
  },
  removeQuestion: (questionId) => {
    dispatch(QuestionListActions.removeQuestion(questionId))
  },
  addVote: (targetId, vote) => {
    const {
      id,
      voteType,
      userId,
      created,
    } = vote;
    dispatch(
      QuestionListActions
        .addVote(targetId, voteType, userId, created,)
    )
  },
  removeVote: (id, userId) => {
    dispatch(QuestionListActions.removeVote(id, userId));
  },
  addFlag: (id) => {
    dispatch(QuestionListActions.addFlag(id))
  },
  removeFlag: (id) => {
    dispatch(QuestionListActions.removeFlag(id))
  },
  addResponse: (response) => {
    const {
      id,
      content,
      created,
      userId,
    } = response;
    dispatch(
      QuestionListActions
        .addResponse(id, content, created, userId,)
    )
  },
  removeResponse: (id) => {
    dispatch(QuestionListActions.removeResponse(id));
  },
  reflectiveAnswerReceived: () => {
    dispatch(ReflectiveActions.answerReceived());
  },
  reflectiveAnswerReviewed: () => {
    dispatch(ReflectiveActions.answerReviewed());
  },
  studentJoinedCourseSession: (number) => {
    dispatch(AttendanceActions.studentJoinedCourseSession(number));
  },
  handleStudentJoinedAttendance: (attendance) => {dispatch(AttendanceActions.studentJoined(attendance))},
});

DashCourse = connect(
  stateToProps,
  dispatchToProps,
)(DashCourse);

export default DashCourse;
