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
import * as DrawerActions from '../../../../actions/Drawer';
import * as PresentationActions from '../../../../actions/Presentation';
import { numberInCourseSessionGet, getNumberInAttendance } from '../../../../api/CourseSession';
import { startCourseSession, endCourseSession } from '../../../../api/CourseSession';
import Socket from '../../../../socket/Socket'
import Events from '../../../../socket/Events';
import Ask from './Ask/Ask';
import Alert from './Alert/Alert';
import Main from './Main/Main';
import ConnectionBar from '../../../ConnectionBar';
import Presentation from './Presention/Presentation';
import Graph from './Alert/Graph';
import Assess from './Assess/Assess';
import QuestionBank from './QuestionBank/QuestionBank';
import CourseSessionDialog from './CourseSessionDialog';
import AttendanceDialog from './AttendanceDialog'
import MySlidesDialog from './Presention/MySlidesDialog';
import createWebNotification from '../../../../util/Notification';
import { getAlerts, INTERVAL_TIME, initInstructorAlertGraph } from '../../../../util/AlertGraph'


let previousAlertCount = 0;

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
  const events = {
    [Events.INSTANT_ASSESSMENT_ANSWERED]: {
      name: Events.INSTANT_ASSESSMENT_ANSWERED,
      handler: (data) => instantAnswerReceived(
        data.userId,
        data.optionIndex,
      ),
    },
    [Events.REFLECTIVE_ASSESSMENT_REVIEWED]: {
      name: Events.REFLECTIVE_ASSESSMENT_REVIEWED,
      handler: (data) => reflectiveAssessmentReviewed(),
    },
    [Events.REFLECTIVE_ASSESSMENT_ANSWERED]: {
      name: Events.REFLECTIVE_ASSESSMENT_ANSWERED,
      handler: (data) => reflectiveAssessmentAnswered(),
    },
    [Events.QUESTION_ASKED]: {
      name: Events.QUESTION_ASKED,
      handler: (data) => addQuestion(data.question),
    },
    [Events.RESPONSE_ADD]: {
      name: Events.RESPONSE_ADD,
      handler: (data) => addResponse(data.response),
    },
    [Events.RESPONSE_REMOVED]: {
      name: Events.RESPONSE_REMOVED,
      handler: (data) => removeResponse(data.id),
    },
    [Events.VOTE_ADD]: {
      name: Events.VOTE_ADD,
      handler: (data) => {
        if (data.vote.userId === userId) return;
        addVote(
          data.targetId,
          data.vote,
        )
      }
    },
    [Events.VOTE_REMOVE]: {
      name: Events.VOTE_REMOVE,
      handler: (data) => {
        if (data.userId === userId) return;
        removeVote(data.id, data.userId)
      }
    },
    [Events.ADD_FLAG]: {
      name: Events.ADD_FLAG,
      handler: (data) => addFlag(data.id),
    },
    [Events.REMOVE_FLAG]: {
      name: Events.REMOVE_FLAG,
      handler: (data) => removeFlag(data.id),
    },
    [Events.STUDENT_JOINED_COURSESESSION]: {
      name: Events.STUDENT_JOINED_COURSESESSION,
      handler: (data) => studentJoinedCourseSession(
        data.numberInCourseSession,
      ),
    },
    [Events.STUDENT_JOINED_ATTENDANCE]: {
      name: Events.STUDENT_JOINED_ATTENDANCE,
      handler: (data) => handleStudentJoinedAttendance(
        data.attendance
      ),
    }
  };
  Socket.bindAllEvents(events, courseSessionChannel);
}

class DashCourse extends Component {
  componentWillMount() {
    window.clearInterval(window.intervalGetAlerts);
  }

  async componentDidMount() {
    const {
      courseSessionId,
      studentJoinedCourseSession,
      handleStudentJoinedAttendance,
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
    } = this.props;
    console.log('DashCourse componentDidMount()');
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
      const { updateAlertGraph, alertGraph, numberAttendees  } = this.props;
      window.intervalGetAlerts =  window.setInterval( async () => {
        try {
          let alerts = await getAlerts(courseSessionId);

          updateAlertGraph(alerts, alertGraph);
        } catch (e) {
          console.error("[ERROR] in DashCourse Component > ComponentDidMount : " + e)
        }
      }, INTERVAL_TIME);

    }



  }
  componentWillUnmount() {
    console.log('DashCourse componentWillUnmount');
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
      isCourseSessionActive,
      courseSessionId,
      connectionStatus,
      setConnectionStatus,
      closeDrawer,
      setAttendance,
      setPresentationUrl,
      activeAlerts
    } = this.props;

    let soundNotification;
    if(previousAlertCount !== activeAlerts){
      if(activeAlerts > previousAlertCount) {
        createWebNotification((activeAlerts) + " Active Alerts! ");
        //TODO: Create Sound Notification
        soundNotification = (
          <audio hidden controls autoPlay style={{bottom : "0px", zIndex: 20000 }}>
            <source src={require('../../../../mp3/going-up.mp3')} type="audio/mpeg" autoPlay="autoPlay"/>
          </audio>
        );
      }
      previousAlertCount = activeAlerts;
    }

    const events = {
      [Events.INSTANT_ASSESSMENT_ANSWERED]: {
        name: Events.INSTANT_ASSESSMENT_ANSWERED,
        handler: (data) => instantAnswerReceived(
          data.userId,
          data.optionIndex,
        ),
      },
      [Events.REFLECTIVE_ASSESSMENT_REVIEWED]: {
        name: Events.REFLECTIVE_ASSESSMENT_REVIEWED,
        handler: (data) => reflectiveAssessmentReviewed(),
      },
      [Events.REFLECTIVE_ASSESSMENT_ANSWERED]: {
        name: Events.REFLECTIVE_ASSESSMENT_ANSWERED,
        handler: (data) => reflectiveAssessmentAnswered(),
      },
      [Events.QUESTION_ASKED]: {
        name: Events.QUESTION_ASKED,
        handler: (data) => addQuestion(data.question),
      },
      [Events.RESPONSE_ADD]: {
        name: Events.RESPONSE_ADD,
        handler: (data) => addResponse(data.response),
      },
      [Events.RESPONSE_REMOVED]: {
        name: Events.RESPONSE_REMOVED,
        handler: (data) => removeResponse(data.id),
      },
      [Events.VOTE_ADD]: {
        name: Events.VOTE_ADD,
        handler: (data) => {
          if (data.vote.userId === userId) return;
          addVote(
            data.targetId,
            data.vote,
          )
        }
      },
      [Events.VOTE_REMOVE]: {
        name: Events.VOTE_REMOVE,
        handler: (data) => {
          if (data.userId === userId) return;
          removeVote(data.id, data.userId)
        }
      },
      [Events.ADD_FLAG]: {
        name: Events.ADD_FLAG,
        handler: (data) => addFlag(data.id),
      },
      [Events.REMOVE_FLAG]: {
        name: Events.REMOVE_FLAG,
        handler: (data) => removeFlag(data.id),
      },
      [Events.STUDENT_JOINED_COURSESESSION]: {
        name: Events.STUDENT_JOINED_COURSESESSION,
        handler: (data) => studentJoinedCourseSession(
          data.numberInCourseSession,
        ),
      },
      [Events.STUDENT_JOINED_ATTENDANCE]: {
        name: Events.STUDENT_JOINED_ATTENDANCE,
        handler: (data) => handleStudentJoinedAttendance(
          data.attendance
        ),
      }
    };

    const { courseId } = params;

    let content = null;
    switch (mode) {
      case 'PRESENTATION' : {
        content = (
          <Presentation/>
        );

        break;
      }
      case 'MAIN': {
        content = (
          <Main/>
        );

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
          isCourseSessionActive={isCourseSessionActive}
          onStartClick={() => {
            handleCourseSessionStart(courseId, userId)
              .then(({
                error,
                courseSessionId,
                numberAttendees,
                numberInCourseSession,
              }) => {
                if (!!error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                hideOverlay();
                closeDrawer();
                activateCourseSession(courseSessionId);
                setAttendance(numberInCourseSession, numberAttendees);
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
                closeDrawer();
                deactivateCourseSession();
              })
              .catch(() => {
                toastr.error('Something went wrong please try again');
              });
          }}
          onCancelClick={() => { hideOverlay(); }}
        />
        <MySlidesDialog
          isOpen={!!isOverlayVisible && overlayType === 'MY_SLIDES'}
          onCancelClick={() => { hideOverlay(); }}
          onSubmitClick={ (url) => {
            setPresentationUrl(courseId, url);
            hideOverlay();
          }}
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
        <ConnectionBar
          isCourseSessionActive={!!courseSessionId}
          courseSessionId={courseSessionId}
          connectionStatus={connectionStatus}
          setConnectionStatus={setConnectionStatus}
          requiredEvents={events}
        />
        {soundNotification}
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
  alertGraph: !!state.Graph.Alert.graph ? state.Graph.Alert.graph : initInstructorAlertGraph(),
  numberAttendees: state.Course.Attendance.numberAttendees,
  connectionStatus: state.Socket.connectionStatus,
  courseId: state.Course.id,
  activeAlerts: state.Graph.Alert.activeAlerts ? state.Graph.Alert.activeAlerts : 0
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
  updateAlertGraph: (activeAlerts, graph) => {
    dispatch(AlertActions.receivedActiveAlerts(activeAlerts, graph));
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
    dispatch(ReflectiveActions.studentSubmittedAnswer());
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

    createWebNotification("New Question : " + content);
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
  handleStudentJoinedAttendance: (attendance) => {
    dispatch(AttendanceActions.studentJoined(attendance))
  },
  setConnectionStatus: (connectionStatus) => {
    dispatch(SocketActions.setConnectionStatus(connectionStatus));
  },
  closeDrawer: () => {
    dispatch(DrawerActions.closeDrawer());
  },
  setAttendance: (numberInCourseSession, numberAttendees) => {
    dispatch(AttendanceActions.setAttendance(
      numberInCourseSession,
      numberAttendees
    ));
  },
  setPresentationUrl: (id, url) => {
    dispatch(PresentationActions.setPresentationUrl(id, url));
    //TODO: save this url in our db along with the course
  }
});

DashCourse = connect(
  stateToProps,
  dispatchToProps,
)(DashCourse);

export default DashCourse;
