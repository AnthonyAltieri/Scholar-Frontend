/**
 * @author Anthony Altieri on 9/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as OverlayActions from '../../../actions/Overlay';
import * as DashStudentActions from '../../../actions/DashStudent';
import * as CourseSessionActions from '../../../actions/CourseSession'
import * as AssessmentActions from '../../../actions/Assess/Assess'
import * as CoursesActions from '../../../actions/Dash/Courses/Courses'
import * as SocketActions from '../../../actions/Socket'
import Content from './Content';
import setUpSockets, { getEvents } from '../../../socket/DashStudentSockets';
import { disconnect as socketDisconnect } from '../../../socket/Socket';
import Nav from '../../Navigation/DashStudent/Nav';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AlertFab from './AlertFab';
import MainFab from './MainFab';
import * as LoadingActions from '../../../actions/Loading'
import ToCourseDialog from './ToCoursesDialog';
import TextInstructionsDialog from './TextInstructionsDialog'
import AlertDialog from './AlertDialog';
import AttendanceDialog from './AttendanceDialog';
import MenuItem from 'material-ui/MenuItem';
import ConnectionBar from '../../ConnectionBar';
import FontIcon from 'material-ui/FontIcon';
import Drawer from './Drawer';
import * as QuestionListActions from '../../../actions/QuestionList';
import * as UserActions from '../../../actions/User';
import * as DrawerActions from '../../../actions/Drawer';
import AlertGraph from './AlertGraph';
import { getAlerts, INTERVAL_TIME } from '../../../util/AlertGraph'
import * as AlertActions from '../../../actions/Alert'
import * as MenuActions from '../../../actions/Menu'
import * as ReflectiveActions from '../../../actions/Assess/Reflelctive';
import { createAlert } from '../../../api/Alert'
import {
  joinAttendance,
  getNumberInAttendance,
  numberInCourseSessionGet,
  getActiveAssessment,
} from '../../../api/CourseSession'
import { toastr } from 'react-redux-toastr';
import * as AttendanceActions from '../../../actions/Attendance'
import { getByUser as getCoursesByUser } from '../../../api/Courses';


async function handleGetCourses(
  userId,
  receivedCourses
) {
	console.log('userId', userId);
  try {
    const { error, courses } = await getCoursesByUser(userId);
    if (!!error) {
      console.error('[ERROR] : ', error);
      toastr.error('Something went wrong please refresh the page');
      return;
    }
    receivedCourses(courses);
  } catch (e) {
    console.error('[ERROR] : ', e);
    toastr.error('Something went wrong please refresh the page');
  }
}

async function handleAlertThreshold(
  courseId,
  courseSessionId,
  setAlertThreshold,
  setAlertPercentage
) {
  setAlertThreshold(courseId)
    .then((payload) => {
      const { error, alertThreshold } = payload;
      if (!error) {
        console.error('error getting alert threshold')
        return;
      }
      setAlertThreshold(alertThreshold);
    })
    .catch((error) => {
      console.error('error getting alert threshold')
    });

  setAlertPercentage(courseSessionId)
    .then((payload) => {
      const { error, alertPercentage } = payload;
      if (!error) {
        console.error('error getting alert percentage');
        return;
      }
      setAlertPercentage(alertPercentage);
    })
    .catch((error) => {
      console.error('error getting alert percentage');
    })
}

async function handleActiveAssessments(
  courseSessionId,
  receivedActiveAssessment,
  isAssessmentActive,
  deactivateAssessment,
) {
  try {
    const payload = await getActiveAssessment(courseSessionId);
    const {
      activeAssessmentType,
      activeAssessment,
    }  = payload;
    if (process.env.NODE_ENV !== 'production') {
      console.log('activeAssessment');
      console.log('Has Active Assessment: ' + !!activeAssessmentType);
    }
    if (!!payload.error) return;
    if (!!activeAssessmentType && !isAssessmentActive) {
      receivedActiveAssessment(
        activeAssessment.id,
        activeAssessmentType,
        activeAssessment.question,
        activeAssessment.options,
      )
    } else if (!activeAssessmentType && isAssessmentActive) {
      deactivateAssessment();
    } else {
      throw new Error(`Invalid activeAssessmentType: ${activeAssessmentType}`);
    }
  } catch (e) {
    console.error('[ERROR] Dash Student handleActiveAssessments', e);
  }
}


class DashStudent extends Component {
  async componentWillMount(){
    const {
      studentJoinedAttendance,
      courseSessionId,
    } = this.props;
    try{
      const payload =  await getNumberInAttendance(courseSessionId);
      const error = payload.error;
      let numberInAttendance = payload.attendance;
      if (!error) {
        studentJoinedAttendance(numberInAttendance);
      }
    }
    catch (e) {
      console.error("[ERROR] in DashStudent component > ComponentWillMount : " + e);
    }
  }



  async componentDidMount() {
    const {
      endLoading,
      courseSessionId,
      updateAlertGraph,
      studentJoinedCourseSession,
      receivedActiveAssessment,
      isAssessmentActive,
      deactivateAssessment,
    } = this.props;
    endLoading();

    try {
      let {
        numberInCourseSession,
        error,
      } = await numberInCourseSessionGet(courseSessionId);
      if (!error) {
        studentJoinedCourseSession(numberInCourseSession);
      }

      window.intervalGetAlerts =  window.setInterval( async () => {
        try {
          let alerts = await getAlerts(courseSessionId);
          updateAlertGraph(alerts);
        }
        catch (e) {
          console.error("[ERROR] in DashCourse Component > ComponentDidMount inside intervalGetAlerts: " + e)
        }
      }, INTERVAL_TIME);


      await handleActiveAssessments(courseSessionId, receivedActiveAssessment);
      window.activeAssessmentInterval = window.setInterval(
        handleActiveAssessments(courseSessionId, receivedActiveAssessment),
        INTERVAL_TIME,
        isAssessmentActive,
        deactivateAssessment
      );

      console.log('DashStudent componentDidMount()');
      setUpSockets(this.props)
    }
    catch (e) {
      console.error("[ERROR] in DashCourse Component > ComponentDidMount " + e)
    }

  }

  componentWillUnmount() {
    socketDisconnect();
    window.clearInterval(window.intervalGetAlerts);
    window.clearInterval(window.activeAssessmentInterval);
  }

  render() {
    const {
      mode,
      code,
      courseId,
      courseSessionId,
      userId,
      onAlertClick,
      setModeToAsk,
      setModeToQuestions,
      promptGoToCourses,
      goToCourses,
      isOverlayVisible,
      hideOverlay,
      hideAlertOverlay,
      isAlertOverlayVisible,
      params,
      activeAlerts,
      threshold,
      isDrawerOpen,
      closeDrawer,
      overlayType,
      openAttendanceDialog,
      closeAttendanceDialog,
      connectionStatus,
      setConnectionStatus,
      numberInCourseSession,
      showTextInstructions,
      closeTextInstructionsDialog
    }  = this.props;
    const events = getEvents(this.props);
    const alertPercentage = ((activeAlerts/numberInCourseSession) * 100);
      return (
          <div className="dash-student">
          <ToCourseDialog
            onYesClick={() => {
              // TODO: account for student leaving
              hideOverlay();
              closeDrawer();
              goToCourses(userId);
            }}
            onNoClick={() => {
              hideOverlay();
            }}
            isOpen={overlayType === 'GO_TO_COURSES'
              && isOverlayVisible
            }
          />
          <AlertDialog
            onOkClick={() => hideAlertOverlay()}
            isOpen={isAlertOverlayVisible}
          />
          <TextInstructionsDialog
            onCancelClick={() => closeTextInstructionsDialog()}
            isOpen={overlayType === 'SHOW_TEXT_INSTRUCTIONS'
              && isOverlayVisible
            }
          />
          <AttendanceDialog
            onSubmitClick={async (attendanceCode) => {
              try {
                const payload = await joinAttendance(courseSessionId, attendanceCode.toLowerCase().trim(), userId);
                if(!!payload){
                  const { attendance, studentAlreadyInAttendance, isAttendanceClosed, invalidCode } = payload;

                  if(!!attendance) {
                    console.log("ATTENDANCE SUCCESS");
                    hideOverlay();
                    toastr.success("You have been added to this attendance list!");
                  }
                  else {
                    console.error("[ERROR] While Joining courseSession Attendance : ");
                    if(!!studentAlreadyInAttendance) {
                      toastr.info("You are already in this attendance list!");
                      hideOverlay();
                    }
                    if(!!isAttendanceClosed) {
                      toastr.error("Please wait for your professor to open the attendance.")
                    }
                    if(!!invalidCode) {
                      toastr.error("This is an invalid attendance code. Please try again")
                    }
                  }
                }
                else {
                  console.error("[ERROR] While Joining courseSession Attendance : Unknown ");
                  toastr.error("An error occurred :( Please refresh the page and try again");
                }
              }
              catch (e) {
                console.error("[ERROR] in DashStudent component > render > AttendanceDialog : " + e);
              }
            }}
            onCancelClick={() => closeAttendanceDialog()}
            isOpen={isOverlayVisible && overlayType === 'ATTENDANCE'}
          />
          <Nav
            {...this.props}
            mode={mode}
            code={code}
            onBackClick={() => {
            }
          }
            courseSessionId={courseSessionId}
          />
          <Drawer
            isDrawerOpen={isDrawerOpen}
            closeDrawer={closeDrawer}
            onCoursesClick={() => promptGoToCourses()}
            onAttendanceClick={() => openAttendanceDialog()}
            onSMSHelpClick={() => showTextInstructions()}
          />
          <Content params={params || {}} mode={mode} />
          {mode !== 'ASSESSMENT'
            ? (
              <AlertFab
                onAlertClick={onAlertClick}
                onClick={() => {
                  createAlert(courseSessionId, courseId, userId);
                  onAlertClick();
                }}
              />
            )
            : null
          }
          <MainFab
            mode={mode}
            setModeToQuestions={setModeToQuestions}
            setModeToAsk={setModeToAsk}
          />
          {mode !== 'ASSESSMENT'
            ? (
              <AlertGraph
                percentage={alertPercentage}
                isPastThreshold={alertPercentage >= threshold}
              />
            )
            : null
          }
          <ConnectionBar
            isCourseSessionActive={!!courseSessionId}
            courseSessionId={courseSessionId}
            connectionStatus={connectionStatus}
            setConnectionStatus={setConnectionStatus}
            requiredEvents={events}
          />
        </div>
      );
    }
};

const mapStateToProps = (state) => {
  return {
    mode: state.DashStudent.mode || 'QUESTIONS',
    code: state.Course.abbreviation || '',
    isOverlayVisible: !!state.Overlay.isVisible,
    isAlertOverlayVisible: !!state.DashStudent.isAlertOverlayVisible,
    courseSessionId: state.Course.activeCourseSessionId,
    courseId: state.Course.id,
    userId: state.User.id,
    activeAlerts: state.Graph.Alert.activeAlerts,
    threshold: state.Graph.Alert.threshold,
    isDrawerOpen: !!state.Drawer.isOpen,
    isInAttendance: !!state.Drawer.isInAttendance,
    overlayType: state.Overlay.type,
    attendance: state.Course.Attendance.numberAttendees,
    numberInCourseSession: state.Course.Attendance.numberInCourseSession,
    connectionStatus: state.Socket.connectionStatus,
    isAssessmentActive: !!state.Assess.activeAssessmentId,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackQuestionsClick: () => {
      dispatch(setDashMode('QUESTIONS'))
    },
    receivedCourses: (courses) => {

    },
    goToCourses: (userId) => {
      dispatch(push('/dash/courses'));
      dispatch(DashStudentActions.setDashMode('QUESTIONS'))
      window.clearInterval(window.intervalGetAlerts);
      window.getCoursesInterval = window.setInterval(() => {
        try {
          handleGetCourses(
            userId,
            (courses) => dispatch(
              CoursesActions.receivedCourses(courses)
            )
          );
        } catch (e) {
          console.error('[ERROR] handleGetCourses', e);
        }
      }, 1000);
    },
    hidePrompt: () => {
      dispatch(OverlayActions.hideOverlay());
    },
    hideAlertOverlay: () => {
      dispatch(DashStudentActions.hideAlertOverlay());
    },
    onAlertClick: () => {
      dispatch(DashStudentActions.showAlertOverlay());
    },
    setModeToAsk: () => {
      dispatch(DashStudentActions.setDashMode('ASK'));
    },
    setModeToQuestions: () => {
      dispatch(DashStudentActions.setDashMode('QUESTIONS'))
    },
    onConfirmClick: () => {
      dispatch(DashStudentActions.setDashMode('QUESTIONS'))
    },
    showTextInstructions: () => {
      dispatch(OverlayActions.setOverlayType('SHOW_TEXT_INSTRUCTIONS'));
      dispatch(OverlayActions.showOverlay());
    },
    promptGoToCourses: () => {
      dispatch(OverlayActions.setOverlayType('GO_TO_COURSES'));
      dispatch(OverlayActions.showOverlay());
    },
    hideOverlay: () => {
      dispatch(OverlayActions.hideOverlay());
      dispatch(OverlayActions.clearOverlayType());
    },
    endLoading: () => {
      dispatch(LoadingActions.endLoading());
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
    dismissQuestion: (questionId) => {
      dispatch(QuestionListActions.dismissQuestion(questionId))
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
    setAlertThreshold: (threshold) => {
      dispatch(CourseSessionActions.setAlertThreshold(threshold))
    },
    setAlertPercentage: (percentage) => {
      dispatch(CourseSessionActions.setAlertPercentage(percentage))
    },
    logOut: () => {
      dispatch(UserActions.logOut());
    },
    receivedActiveAssessment: (
      assessmentId,
      assessmentType,
      question,
      options,
    ) => {
      dispatch(AssessmentActions
        .receivedActiveAssessment(
          assessmentId,
          assessmentType,
          question,
          options,
        )
      )
    },
    deactivateAssessment: () => {
      dispatch(DashStudentActions.setDashMode('QUESTIONS'));
      dispatch(AssessmentActions.deactivate());
    },
    updateAlertGraph: (activeAlerts) => {
      dispatch(AlertActions.updateActiveAlertsStudent(activeAlerts));
    },
    reflectiveStartReview: (toReview) => {
      dispatch(ReflectiveActions.startReview(toReview));
    },
    openMenu: () => {
      dispatch(MenuActions.openMenu());
    },
    openDrawer: () => {
      dispatch(DrawerActions.openDrawer());
    },
    closeDrawer: () => {
      dispatch(DrawerActions.closeDrawer())
    },
    openAttendanceDialog: () => {
      dispatch(OverlayActions.setOverlayType('ATTENDANCE'));
      dispatch(OverlayActions.showOverlay());
    },
    closeTextInstructionsDialog: () => {
      dispatch(OverlayActions.hideOverlay());
      dispatch(OverlayActions.clearOverlayType());
    },
    closeAttendanceDialog: () => {
      dispatch(OverlayActions.hideOverlay());
      dispatch(OverlayActions.clearOverlayType());
    },
    addEndorse: (id) => {
      dispatch(QuestionListActions.addEndorse(id));
    },
    removeEndorse: (id) => {
      dispatch(QuestionListActions.removeEndorse(id));
    },
    studentJoinedAttendance : (attendance) => {
      dispatch(AttendanceActions.studentJoined(attendance));
    },
    setConnectionStatus: (connectionStatus) => {
      dispatch(SocketActions.setConnectionStatus(connectionStatus));
    },
    studentJoinedCourseSession: (number) => {
      dispatch(AttendanceActions.studentJoinedCourseSession(number));
    },
  }
};

DashStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashStudent);

export default DashStudent;
