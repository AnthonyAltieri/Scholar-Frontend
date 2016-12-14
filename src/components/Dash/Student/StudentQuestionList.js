/**
 * @author Anthony Altieri on 9/1/16.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux';
import { connect } from 'react-redux';
import QuestionResponse from '../Instructor/Course/Ask/QuestionList/QuestionResponse';
// import { fetchQuesitons } from '../../../api/Questions';
import * as DashStudentActions from '../../../actions/DashStudent'

const getRank = (votes) => {
  return votes.filter(v => v.type === 'UP').length
};

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

    default: {
      throw new Error(`Invalid filter ${filter}`);
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
    const {
      activeCourseSessionId,
      questions,
      filter,
    } = this.props;
    console.log('filter', filter);
    console.log('questions', questions);
    return (
      <div
        className="c"
        style={{
          overflowY: "auto",
          paddingTop: 12,
        }}
      >
        {questions.map((q) => (
          <QuestionResponse
            isQuestion
            key={q.id}
            rank={getRank(q.votes)}
            depthRestriction={2}
            content={q.content}
            created={q.created}
            responses={q.responses}
            id={q.id}
            courseSessionId={activeCourseSessionId}
          />
        ))}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  questions: getVisibleQuestions(
    ownProps.filter,
    state.QuestionList,
    state.User.id,
  ),
  activeCourseSessionId: state.Course.activeCourseSessionId,
});
const dispatchToProps = (dispatch) => ({
  retrievedQuestions: (questions) => {
    dispatch(DashStudentActions.retrievedQuestions(questions));
  }
});

StudentQuestionList = connect(
  mapStateToProps,
)(StudentQuestionList);

export default StudentQuestionList;
