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
import Questions from './Questions';
import AlertGraph from '../Alert/Graph';
import Stats from './Stats';


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

class Main extends Component {
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
    return (
      <div className="main r-between">
        <div className="left-pane c fullheight">
          <div
            className="half-pane card"
            id="main-alert-graph"
            style={{ marginBottom: '1%' }}
          >
            <AlertGraph />
          </div>
          <div
            className="half-pane card"
            style={{ marginTop: '1%' }}
          >
            <Stats
              numberQuestions={this.props.numberQuestions}
              numberPresent={this.props.numberPresent}
              numberActiveAlerts={this.props.numberActiveAlerts}
              numberAttendance={this.props.numberAttendance}
            />
          </div>
        </div>
        <div className="right-pane c card fullheight">
          <Questions {...this.props} />
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

Main = connect(
  stateToProps,
  dispatchToProps
)(Main);

export default Main;
