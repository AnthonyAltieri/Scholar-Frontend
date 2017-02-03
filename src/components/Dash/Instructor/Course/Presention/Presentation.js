/**
 * Created by bharatbatra on 1/31/17.
 */
/**
 * @author Anthony Altieri on 1/2/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionResponse from '../Ask/QuestionList/QuestionResponse';
import * as MainActions
  from '../../../../../actions/DashInstructor/Course/Main';
import * as AskActions from '../../../../../actions/Dash/Courses/Ask';
import * as QuestionsActions from '../../../../../actions/Questions'
import * as QuestionListActions from '../../../../../actions/QuestionList';
import { fetchQuestions } from '../../../../../api/Questions';
import Questions from '../Main/Questions';
import AlertBar from '../../../Student/AlertGraph';
import SlideShow from './SlideShow'



const getVisibleQuestions = (filter = 'MOST_RECENT', allQuestions = []) => {
  const questions = allQuestions.filter(q => !q.isDismissed);
  switch (filter) {
    case 'MOST_VOTED': {
      return questions
        .slice(0)
        .sort((l, r) => r.votes.length - l.votes.length);
    }

    case 'LEAST_VOTED': {
      return questions
        .slice(0)
        .sort((l, r) => l.votes.length - r.votes.length);
    }

    case 'LEAST_RECENT': {
      return questions
        .slice(0).sort((l, r) => {
          if (l.created < r.created) {
            return -1;
          } else if (l.created > r.created) {
            return 1;
          } else {
            return 0;
          }
        });
    }

    case 'MOST_RECENT': {
      return questions
        .slice(0).sort((l, r) => {
          if (l.created < r.created) {
            return 1;
          } else if (l.created > r.created) {
            return -1;
          } else {
            return 0;
          }
        });
    }

    default: {
      throw new Error(`Invalid filter ${filter}`);
    }
  }
};

class Presentation extends Component {
  componentDidMount() {
    const {
      isCourseSessionActive,
      activeCourseSessionId,
      receivedQuestions,
    } = this.props;
    if (isCourseSessionActive) {
      fetchQuestions(activeCourseSessionId)
        .then((result) => {
          const { questions, error } = result;
          if (!!error) {
            toastr.error(
              'Question List Error',
              'Something went wrong fetching the questions'
            );
            return;
          }
          receivedQuestions(questions.filter(q => !q.isDismissed));
        })
        .catch((error) => {})
    }

  }




  render() {
    const { windowHeight, windowWidth, numberActiveAlerts, numberPresent, threshold, url } = this.props;
    const percentage= (numberActiveAlerts / numberPresent) * 100;
    const isPastThreshold= (percentage >= threshold) ;

    const getPresentationFrame = () => {
      try {
       return url ? (
            <iframe
            src={url}
            frameBorder="0"
            width={ windowWidth * 0.72 }
            height={ windowHeight * 0.9 }
            allowFullScreen
          />
          ) : "No Presentation Linked!";
      }
      catch (e){
        console.error("[ERROR] Presentation Component > getPresentationFrame : ")
        return "Error With Link - Please make sure Sharing Permissions are set correctly";
      }
    };
    return (
      <div className="c-around">
        <AlertBar isPastThreshold={isPastThreshold} percentage={percentage} positionalClass="alert-graph-top"/>

        <div className="main r-between" style={{top: "90px"}}>
          <div className="left-pane-wide c fullheight">

            {getPresentationFrame()}

          </div>
          <div className="right-pane-narrow c card fullheight">
            <Questions {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  questions: getVisibleQuestions(
    state.Dash.Instructor.Course.Main.filter,
    state.QuestionList,
  ),
  numberQuestions: getVisibleQuestions(
    state.Dash.Instructor.Course.Main.filter,
    state.QuestionList
  ).length,
  numberPresent: state.Course.Attendance.numberInCourseSession,
  numberActiveAlerts: state.Graph.Alert.activeAlerts,
  numberAttendance: state.Course.Attendance.numberAttendees,
  isCourseSessionActive: !!state.Course.activeCourseSessionId,
  activeCourseSessionId: state.Course.activeCourseSessionId,
  filter: state.Dash.Instructor.Course.Main.filter,
  windowHeight: state.Window.height,
  windowWidth: state.Window.width,
  url: state.Course.Presentation ? state.Course.Presentation.url : null,
  threshold : state.Graph.Alert.threshold
});

const dispatchToProps = (dispatch) => ({
  receivedQuestions: (questions) => {
    dispatch(AskActions.receivedQuestions(questions));
  },
  dismissQuestion: (id) => {
    dispatch(QuestionListActions.dismissQuestion(id))
  },
  responseRemove: (id) => {
    dispatch(QuestionsActions.responseRemove(id));
  },
  addEndorse: (id) => {
    dispatch(QuestionListActions.addEndorse(id))
  },
  removeEndorse: (id) => {
    dispatch(QuestionListActions.removeEndorse(id))
  },
  setFilter: (filter) => {
    dispatch(MainActions.setFilter(filter))
  },
});

Presentation = connect(
  stateToProps,
  dispatchToProps
)(Presentation);

export default Presentation;
