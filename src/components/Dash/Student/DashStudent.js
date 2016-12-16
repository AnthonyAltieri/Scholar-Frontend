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
import Content from './Content';
import Socket from '../../../socket/Socket';
import Events from '../../../socket/Events';
import Nav from '../../Navigation/DashStudent/Nav';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import * as LoadingActions from '../../../actions/Loading'
import Colors from '../../../util/Colors'
import ToCourseDialog from './ToCoursesDialog';
import AlertDialog from './AlertDialog';
import * as QuestionListActions from '../../../actions/QuestionList';
import * as UserActions from '../../../actions/User';
import AlertGraph from './AlertGraph';

const fabAskStyle = {
  position: "absolute",
  bottom: "30px",
  right: "16px",
  zIndex: "10",
};

const fabAlertStyle = {
  position: "absolute",
  bottom: "106px",
  right: "24px",
  zIndex: "10",
};

function setUpSockets(props) {
  const {
    courseSessionId,
    addQuestion,
    addVote,
    removeVote,
    removeQuestion,
    addFlag,
    removeFlag,
    receivedActiveAssessment,
    deactivateAssessment,
  } = props;
  const courseSessionChannel = `private-${courseSessionId}`;
  Socket.subscribe(courseSessionChannel);
  Socket.bind(
    courseSessionChannel,
    Events.QUESTION_ASKED,
    (data) => { addQuestion(data.question) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.QUESTION_REMOVED,
    (data) => { removeQuestion(data.id) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.ADD_RESPONSE,
    (data) => { addResponse(data.resposne) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.REMOVE_RESPONSE,
    (data) => { removeResponse(data.id) }
  );
  Socket.bind(
    courseSessionChannel,
    Events.ADD_VOTE,
    (data) => {
      if (data.vote.userId === userId) return;
      addVote(data.vote)
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.REMOVE_VOTE,
    (data) => {
      if (data.vote.userId === userId) return;
      removeVote(data.userId)
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
    Events.ASSESSMENT_ACTIVATED,
    (data) => {
      receivedActiveAssessment(
        data.assessmentId,
        data.assessmentType,
        data.question,
        data.options,
      )
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.ASSESSMENT_DEACTIVATED,
    (data) => {
      deactivateAssessment();
    }
  )
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
    })

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
  componentDidMount() {
    const {
      endLoading,
      courseId,
      courseSessionId,
      setAlertThreshold,
      setAlertPercentage,
    } = this.props;
    endLoading();
    // handleAlertThreshold(
    //   courseId,
    //   courseSessionId,
    //   setAlertThreshold,
    //   setAlertPercentage
    // );
    setUpSockets(this.props)
  }

  componentWillUnmount() {
    Socket.disconnect();
  }

  render() {
    const {
      mode,
      code,
      courseSessionId,
      onConfirmClick,
      onAlertClick,
      setModeToAsk,
      setModeToQuestions,
      promptGoToCourses,
      goToCourses,
      isOverlayVisible,
      hideOverlay,
      hideAlertOverlay,
      isAlertOverlayVisible,
      isAlertOverlayShown,
      children,
      logOut,
      params,
    }  = this.props;
    console.log('params', params);
        return (
          <div className="dash-student">
          <ToCourseDialog
            onYesClick={() => {
              // TODO: account for student leaving
              hideOverlay();
              goToCourses();
            }}
            onNoClick={() => {
              hideOverlay();
            }}
            isOpen={isOverlayVisible}
          />
          <AlertDialog
            onOkClick={() => {
              hideAlertOverlay();
            }}
            isOpen={isAlertOverlayVisible}
          />
          <Nav
            {...this.props}
            mode={mode}
            code={code}
            onBackClick={() => {
              promptGoToCourses();
            }
          }
            courseSessionId={courseSessionId}
          />
          <Content params={params || {}} mode={mode} />
          {mode !== 'ASSESSMENT'
            ? (
              <FloatingActionButton
                style={fabAlertStyle}
                backgroundColor={Colors.red}
                onClick={() => {
                  //TODO: Send data to server
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
            onClick={() => {
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
                percentage={20}
              />
            )
            : null
          }
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackQuestionsClick: () => {
      dispatch(setDashMode('QUESTIONS'))
    },
    goToCourses: () => {
      dispatch(push('/dash/courses'))
      dispatch(DashStudentActions.setDashMode('QUESTIONS'))
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
    promptGoToCourses: () => {
      dispatch(OverlayActions.showOverlay());
    },
    hideOverlay: () => {
      dispatch(OverlayActions.hideOverlay())
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
    removeQuestion: (questionId) => {
      dispatch(QuestionListActions.removeQuestion(questionId))
    },
    addVote: (vote) => {
      const {
        id,
        voteType,
        userId,
        created,
      } = vote;
      dispatch(
        QuestionListActions
          .addVote(id, voteType, userId, created,)
      )
    },
    removeVote: (userId) => {
      dispatch(QuestionListActions.removeVote(userId));
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
    }
  }
};

DashStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashStudent);

export default DashStudent;
