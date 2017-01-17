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
import Socket from '../../../socket/Socket';
import Events from '../../../socket/Events';
import Nav from '../../Navigation/DashStudent/Nav';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as LoadingActions from '../../../actions/Loading'
import Colors from '../../../util/Colors'
import ToCourseDialog from './ToCoursesDialog';
import TextInstructionsDialog from './TextInstructionsDialog'
import AlertDialog from './AlertDialog';
import AttendanceDialog from './AttendanceDialog';
import MenuItem from 'material-ui/MenuItem';
import ConnectionBar from '../../ConnectionBar';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import * as QuestionListActions from '../../../actions/QuestionList';
import * as UserActions from '../../../actions/User';
import * as DrawerActions from '../../../actions/Drawer';
import AlertGraph from './AlertGraph';
import { getAlerts, INTERVAL_TIME } from '../../../util/AlertGraph'
import * as AlertActions from '../../../actions/Alert'
import * as MenuActions from '../../../actions/Menu'
import * as ReflectiveActions from '../../../actions/Assess/Reflelctive';
import { createAlert } from '../../../api/Alert'
import { joinAttendance, getNumberInAttendance, numberInCourseSessionGet } from '../../../api/CourseSession'
import { toastr } from 'react-redux-toastr';
import * as AttendanceActions from '../../../actions/Attendance'
import { getByUser as getCoursesByUser } from '../../../api/Courses';

const fabAskStyle = {
  position: "absolute",
  bottom: "40px",
  right: "16px",
  zIndex: "10",
};

const fabAlertStyle = {
  position: "absolute",
  bottom: "116px",
  right: "24px",
  zIndex: "10",
};

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

function setUpSockets(props) {
  const {
    courseSessionId,
    addQuestion,
    addVote,
    removeVote,
    dismissQuestion,
    addFlag,
    removeFlag,
    receivedActiveAssessment,
    deactivateAssessment,
    reflectiveStartReview,
    addEndorse,
    removeEndorse,
    userId,
    studentJoinedAttendance,
    studentJoinedCourseSession,
    goToCourses,
    addResponse,
    removeResponse,
  } = props;
  const courseSessionChannel = `private-${courseSessionId}`;
  Socket.subscribe(courseSessionChannel);
  const events = {
    [Events.QUESTION_ASKED]: {
      name: Events.QUESTION_ASKED,
      handler: (data) => addQuestion(data.question),
    },
    [Events.QUESTION_REMOVED]: {
      name: Events.QUESTION_REMOVED,
      handler: (data) => dismissQuestion(data.id),
    },
    [Events.RESPONSE_ADD]: {
      name: Events.RESPONSE_ADD,
      handler: (data) => addResponse(data.response),
    },
    [Events.RESPONSE_REMOVED]: {
      name: Events.RESPONSE_ADD,
      handler: (data) => removeResponse(data.response)
    },
    [Events.VOTE_ADD]: {
      name: Events.VOTE_ADD,
      handler: (data) => {
        if (data.vote.userId === userId) return;
        addVote(data.targetId, data.vote)
      },
    },
    [Events.VOTE_REMOVE]: {
      name: Events.VOTE_REMOVE,
      handler: (data) => {
        if (data.userId === userId) return;
        removeVote(data.id, data.userId)
      },
    },
    [Events.ADD_FLAG]: {
      name: Events.ADD_FLAG,
      handler: (data) => addFlag(data.id),
    },
    [Events.REMOVE_FLAG]: {
      name: Events.REMOVE_FLAG,
      handler: (data) => removeFlag(data.id),
    },
    [Events.ASSESSMENT_ACTIVATED]: {
      name: Events.ASSESSMENT_ACTIVATED,
      handler: (data) => receivedActiveAssessment(
        data.assessmentId,
        data.assessmentType,
        data.question,
        data.options,
      ),
    },
    [Events.ASSESSMENT_DEACTIVATED]: {
      name: Events.ASSESSMENT_DEACTIVATED,
      handler: (data) => deactivateAssessment(),
    },
    [Events.REFLECTIVE_ASSESSMENT_START_REVIEW]: {
      name: Events.REFLECTIVE_ASSESSMENT_START_REVIEW,
      handler: (data) => reflectiveStartReview(
        data.toReview.filter(a => a.userId !== userId)
      ),
    },
    [Events.ADD_ENDORSE]: {
      name: Events.ADD_ENDORSE,
      handler: (data) => addEndorse(data.id),
    },
    [Events.REMOVE_ENDORSE]: {
      name: Events.REMOVE_ENDORSE,
      handler: (data) => removeEndorse(data.id),
    },
    [Events.STUDENT_JOINED_ATTENDANCE]: {
      name: Events.STUDENT_JOINED_ATTENDANCE,
      handler: (data) => studentJoinedAttendance(data.attendance),
    },
    [Events.END_COURSESESSION]: {
      name: Events.END_COURSESESSION,
      handler: (data) => goToCourses(userId),
    },
    [Events.STUDENT_JOINED_COURSESESSION]: {
      name: Events.STUDENT_JOINED_COURSESESSION,
      handler: (data) => studentJoinedCourseSession(
        data.numberInCourseSession,
      ),
    },
  };
  Socket.bindAllEvents(events, courseSessionChannel);
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


class DashStudent extends Component {
  async componentWillMount(){
    const { studentJoinedAttendance, courseSessionId } = this.props;
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
      courseId,
      courseSessionId,
      setAlertThreshold,
      setAlertPercentage,
      updateAlertGraph,
      attendance,
      studentJoinedCourseSession
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

      console.log('DashStudent componentDidMount()');
      setUpSockets(this.props)
    }
    catch (e) {
      console.error("[ERROR] in DashCourse Component > ComponentDidMount " + e)
    }

  }

  componentWillUnmount() {
    Socket.disconnect() ;
    window.clearInterval(window.intervalGetAlerts);
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
      isInAttendance,
      overlayType,
      openAttendanceDialog,
      closeAttendanceDialog,
      addQuestion,
      addVote,
      removeVote,
      dismissQuestion,
      addFlag,
      removeFlag,
      receivedActiveAssessment,
      deactivateAssessment,
      reflectiveStartReview,
      addEndorse,
      removeEndorse,
      studentJoinedAttendance,
      addResponse,
      removeResponse,
      connectionStatus,
      setConnectionStatus,
      numberInCourseSession,
      showTextInstructions,
      closeTextInstructionsDialog
    }  = this.props;
    const events = {
      [Events.QUESTION_ASKED]: {
        name: Events.QUESTION_ASKED,
        handler: (data) => addQuestion(data.question),
      },
      [Events.QUESTION_REMOVED]: {
        name: Events.QUESTION_REMOVED,
        handler: (data) => dismissQuestion(data.id),
      },
      [Events.RESPONSE_ADD]: {
        name: Events.RESPONSE_ADD,
        handler: (data) => addResponse(data.response),
      },
      [Events.RESPONSE_REMOVED]: {
        name: Events.RESPONSE_ADD,
        handler: (data) => removeResponse(data.response)
      },
      [Events.VOTE_ADD]: {
        name: Events.VOTE_ADD,
        handler: (data) => {
          if (data.userId === userId) return;
          addVote(data.targetId, data.vote)
        },
      },
      [Events.VOTE_REMOVE]: {
        name: Events.VOTE_REMOVE,
        handler: (data) => {
          if (data.userId === userId) return;
          removeVote(data.id, data.userId)
        },
      },
      [Events.ADD_FLAG]: {
        name: Events.ADD_FLAG,
        handler: (data) => addFlag(data.id),
      },
      [Events.REMOVE_FLAG]: {
        name: Events.REMOVE_FLAG,
        handler: (data) => removeFlag(data.id),
      },
      [Events.ASSESSMENT_ACTIVATED]: {
        name: Events.ASSESSMENT_ACTIVATED,
        handler: (data) => receivedActiveAssessment(
          data.assessmentId,
          data.assessmentType,
          data.question,
          data.options,
        ),
      },
      [Events.ASSESSMENT_DEACTIVATED]: {
        name: Events.ASSESSMENT_DEACTIVATED,
        handler: (data) => deactivateAssessment(),
      },
      [Events.REFLECTIVE_ASSESSMENT_START_REVIEW]: {
        name: Events.REFLECTIVE_ASSESSMENT_START_REVIEW,
        handler: (data) => reflectiveStartReview(
          data.toReview.filter(a => a.userId !== userId)
        ),
      },
      [Events.ADD_ENDORSE]: {
        name: Events.ADD_ENDORSE,
        handler: (data) => addEndorse(data.id),
      },
      [Events.REMOVE_ENDORSE]: {
        name: Events.REMOVE_ENDORSE,
        handler: (data) => removeEndorse(data.id),
      },
      [Events.STUDENT_JOINED_ATTENDANCE]: {
        name: Events.STUDENT_JOINED_ATTENDANCE,
        handler: (data) => studentJoinedAttendance(data.attendance),
      },
      [Events.END_COURSESESSION]: {
        name: Events.END_COURSESESSION,
        handler: (data) => goToCourses(userId),
      }
    };

    const adjustedAlertPercentage = (numberInCourseSession) => {
      {
        return ((activeAlerts/numberInCourseSession)*100);
      }
    };
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
            isOpen={isOverlayVisible && overlayType === 'GO_TO_COURSES'}
          />
          <AlertDialog
            onOkClick={() => hideAlertOverlay()}
            isOpen={isAlertOverlayVisible}
          />
          <TextInstructionsDialog
            onCancelClick={() => closeTextInstructionsDialog()}
            isOpen={isOverlayVisible && overlayType === 'SHOW_TEXT_INSTRUCTIONS'}
          />
          <AttendanceDialog
            onSubmitClick={async (attendanceCode) => {
              try {
                const payload = await joinAttendance(courseSessionId, attendanceCode, userId);
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
            docked={false}
            width={200}
            open={isDrawerOpen}
            onRequestChange={(open, reason) => {
              if (!open) {
                closeDrawer();
              }
            }}
          >
            <MenuItem
              onTouchTap={() => promptGoToCourses()}
              rightIcon={
                <FontIcon className="material-icons">
                  list
                </FontIcon>
              }
            >
              Go To Courses
            </MenuItem>
            <MenuItem
              onTouchTap={() => openAttendanceDialog()}
              rightIcon={
                <FontIcon className="material-icons">
                  pan_tool
                </FontIcon>
              }
            >
              Attendance
            </MenuItem>
            <MenuItem
              onTouchTap={() => showTextInstructions()}
              rightIcon={<font className="material-icons">phone_iphone</font>}
            >
              SMS Text Help
            </MenuItem>
          </Drawer>
          <Content params={params || {}} mode={mode} />
          {mode !== 'ASSESSMENT'
            ? (
              <FloatingActionButton
                style={fabAlertStyle}
                backgroundColor={Colors.red}
                onTouchTap={() => {
                  //TODO: Send data to server
                  const payload = createAlert(courseSessionId, courseId, userId);
                  const { error, alert } = payload;
                  if(!!error) {
                    console.error("[ERROR] in DashStudent > onClick of Alert FAB : couldn't create the alert");
                    //TODO: consider adding Toastr Error
                  }
                  else {
                    console.info("[INFO] alert added ");
                  }
                  onAlertClick();
                }}
                mini
              >
                <FontIcon className="material-icons">
                  error_outline
                </FontIcon>
              </FloatingActionButton>
            )
            : null
          }
          <FloatingActionButton
            style={fabAskStyle}
            secondary
            onTouchTap={() => {
              if (mode === 'ASK' || mode === 'ASSESSMENT') {
                setModeToQuestions();
              } else {
                setModeToAsk();
              }
            }}
          >
            {mode === 'ASK' || mode === 'ASSESSMENT'
              ? <FontIcon className="material-icons">
                view_list
              </FontIcon>
              : <FontIcon className="material-icons">
                chat
              </FontIcon>
            }
          </FloatingActionButton>
          {mode !== 'ASSESSMENT'
            ? (
              <AlertGraph
                percentage={adjustedAlertPercentage(numberInCourseSession)}
                isPastThreshold={(adjustedAlertPercentage(numberInCourseSession) >= threshold) ? 1 : 0}
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
    // threshold: state.CourseSession.threshold,
    // alertPercentage: state.CourseSession.alertPercentage,
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
      dispatch(push('/dash/courses'))
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
