/**
 * @author Anthony Altieri on 9/1/16.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import QuestionResponse from '../Instructor/Course/Ask/QuestionList/QuestionResponse';
// import { fetchQuesitons } from '../../../api/Questions';
import * as DashStudentActions from '../../../actions/DashStudent'
import FilterBar from './FilterBar';

const getRank = (votes) => {
  return votes.filter(v => v.type === 'UP').length
};

const getVisibleQuestions = (filter, questions = [], userId) => {
  console.log("getVisibleQuestions", 'filter', filter);
  switch (filter) {
    case '': {
      return questions.filter((q) => q.userId === userId);
    }

    case 'mostVoted': {
      return questions
        .slice(0)
        .sort((l, r) => r.votes.length - l.votes.length);
    }

    case 'leastVoted': {
      return questions
        .slice(0)
        .sort((l, r) => l.votes.length - r.votes.length);
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

    case 'leastRecent': {
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
      courseId,
      userId,
      filter,
      userType,
      navigate,
    } = this.props;
    return (
      <div
        className="c fullheight"
        style={{
          overflowY: "auto",
          paddingBottom: 150,
        }}
      >
        <FilterBar filter={filter} navigate={navigate}/>
        {questions.map((q) => (
          <QuestionResponse
            key={`qr-${q.id}`}
            isQuestion
            votes={q.votes}
            userId={userId}
            courseId={courseId}
            courseSessionId={activeCourseSessionId}
            depthRestriction={2}
            content={q.content}
            created={q.created}
            responses={q.responses}
            id={q.id}
            hasBeenEndorsed={!!q.isEndorsed}
            isInstructor={userType === 'INSTRUCTOR'}
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
  userId: state.User.id,
  courseId: state.Course.id,
  activeCourseSessionId: state.Course.activeCourseSessionId,
  userType: state.User.type,
});
const dispatchToProps = (dispatch) => ({
  retrievedQuestions: (questions) => {
    dispatch(DashStudentActions.retrievedQuestions(questions));
  },
  navigate: (url) => {
    dispatch(push(url))
  },
});

StudentQuestionList = connect(
  mapStateToProps,
  dispatchToProps,
)(StudentQuestionList);

export default StudentQuestionList;
