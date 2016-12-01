/**
 * @author Anthony Altieri on 9/1/16.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux';
import { connect } from 'react-redux';
import QuestionList from './QuestionList/QuestionList';
// import { fetchQuesitons } from '../../../api/Questions';
import * as DashStudentActions from '../../../actions/DashStudent'

const getVisibleQuestions = (filter, questions = [], userId) => {
  switch (filter) {
    case '': {
      return questions.filter((q) => q.userId === userId);
    }

    case 'mostVoted': {
      return questions
        .slice(0)
        .sort((l, r) => r.votes.length - l.votes.length);
    }

    case 'mostRecent': {
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
  }
};


class StudentQuestionList extends Component {
  componentDidMount() {
    const { courseSessionId, retrievedQuestions } = this.props;
    // fetchQuesitons(courseSessionId)
    //   .then((questions) => {
    //     retrievedQuestions(questions);
    //   })

  }

  render() {
    return (
      <div className="student-question-list">
        <QuestionList {...this.props} />
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    questions: getVisibleQuestions(
      ownProps.filter,
      state.DashStudent.questions,
      state.User.id,
    ),
    userId: state.User.id,
  }
};
const dispatchToProps = (dispatch) => ({
  retrievedQuestions: (questions) => {
    dispatch(DashStudentActions.retrievedQuestions(questions));
  }
});

StudentQuestionList = connect(
  mapStateToProps,
)(StudentQuestionList);

export default StudentQuestionList;
