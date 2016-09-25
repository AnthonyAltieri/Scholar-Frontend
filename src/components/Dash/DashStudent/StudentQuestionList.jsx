/**
 * @author Anthony Altieri on 9/1/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux';
import { connect } from 'react-redux';
import QuestionList from '../QuestionList/QuestionList.jsx';

const getVisibleQuestions = (filter, questions = [], userId) => {
  switch (filter) {
    case 'ME': {
      return questions.filter((q) => q.userId === userId);
    }

    case 'MOST_VOTED': {
      return questions
        .slice(0)
        .sort((l, r) => r.votes.length - l.votes.length);
    }

    case 'MOST_RECENT': {
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

const mapStateToProps = (state) => {
  return {
    questions: getVisibleQuestions(
      state.StudentQuestionList.VisibleQuestionFilter,
      state.StudentQuestionList.QuestionList.questions,
      state.User.id,
    ),
    userId: state.User.id,
  }
};

let StudentQuestionList = (props) => (
  <div className="student-question-list">
    <QuestionList {...props} />
  </div>
);


StudentQuestionList = connect(
  mapStateToProps,
)(StudentQuestionList);

export default StudentQuestionList;
