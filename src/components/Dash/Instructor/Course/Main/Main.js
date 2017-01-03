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
import Questions from './Questions';

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
  render() {
    const {
    } = this.props;

    return (
      <div className="main r-between">
        <div className="left-pane c fullheight">
          <div
            className="half-pane card"
            style={{ marginBottom: '1%' }}
          >
            alert graph
          </div>
          <div
            className="half-pane card"
            style={{ marginTop: '1%' }}
          >
            stats
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
  isCourseSessionActive: !!state.Course.activeCourseSessionId,
  activeCourseSessionId: state.Course.activeCourseSessionId,
  filter: state.Dash.Instructor.Course.Main.filter,
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
