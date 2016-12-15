/**
 * @author Anthony Altieri on 10/9/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../../../../api/Questions';
import { toastr } from 'react-redux-toastr';
import QuestionResponse from './QuestionList/QuestionResponse';
import * as AskActions from '../../../../../actions/Dash/Courses/Ask';
import * as QuestionsActions from '../../../../../actions/Questions';
import StatBlock from '../StatBlock';
import Socket from '../../../../../socket/Socket';
import Events from '../../../../../socket/Events';

const filterQuestions = (filter, questions = []) => {
  switch (filter) {
    case 'MOST_VOTED': {
      return questions.sort((a, b) => b.rank - a.rank);
    }

    case 'MOST_RECENT': {
      return questions.sort(((a, b) => {
        if (a.created < b.created) {
          return 1;
        } else if (a.created > b.created) {
          return -1;
        } else {
          return 0;
        }
      }))
    }

    default: {
      throw new Error(`Invalid question filter: ${filter}`);
    }
  }
};

// TODO: more efficient implementation
const calculateNumberResponses = (questions) => {
  let counter = 0;
  let toExplore = [...questions];
  while (toExplore.length > 0) {
    counter += 1;
    const qOrR = toExplore[0];
    toExplore = toExplore.slice(1);
    toExplore = [...toExplore, ...qOrR.responses];
  }
  const result = counter - questions.length;
  return result > 0 ? result : 0;
};

const getRank = (votes) => {
  return votes.filter(v => v.type === 'UP').length
};

const removeDismissed = (questions) => {
  questions = questions.filter(q => !q.isDismissed);
  let toExplore = [...questions];
  while (toExplore.length > 0) {
    const qOrR = toExplore[0];
    toExplore = toExplore.slice(1);
    qOrR.responses = qOrR.responses.filter(r => !r.isDismissed);
    toExplore = [
      ...toExplore,
      ...qOrR.responses
    ];
  }
  return questions;
};

const handleSockets = (props) => {
  const {
    activeCourseSessionId,
    questionRemove,
    responseRemove,
  } = props;
  const courseSessionChannel = `private-${activeCourseSessionId}`;
  Socket.subscribe(courseSessionChannel);
  console.log('courseSessionChannel: ' + courseSessionChannel)
  Socket.bind(
    courseSessionChannel,
    Events.QUESTION_REMOVED,
    ({ id }) => {
      console.log('[SOCKET EVENT] ' + Events.QUESTION_REMOVED);
      questionRemove(id);
    }
  );
  Socket.bind(
    courseSessionChannel,
    Events.RESPONSE_REMOVED,
    ({ id }) => {
      console.log('[SOCKET EVENT] ' + Events.RESPONSE_REMOVED);
      responseRemove(id)
    }
  )
};

class Ask extends Component {
  componentDidMount() {
    const {
      isCourseSessionActive,
      activeCourseSessionId,
      receivedQuestions,
    } = this.props;
    if (isCourseSessionActive) {
      const courseSessionChannel = `private-${activeCourseSessionId}`;
      Socket.subscribe(courseSessionChannel);
      handleSockets(this.props);
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

          receivedQuestions(removeDismissed(questions));
        })
        .catch((error) => {})
    }
  }

  render() {
    const {
      isCourseSessionActive,
      questions,
      activeCourseSessionId,
      mostVotedQuestions,
      mostRecentQuestions,
    } = this.props;
    return (
      <div className="ask r-between">
        <div className="left-pane c">
          <div
            className="two-thirds-pane"
            style={{
              marginBottom: '1%',
            }}
            >
            <div className="heading">
              <h2 className="header">MOST VOTED</h2>
            </div>
            <div
              style={{
                overflowY: "auto",
              }}
            >
              {isCourseSessionActive ?
                mostVotedQuestions.map((q) => (
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
                ))
                : null
              }
            </div>
          </div>
          <div
            className="one-thirds-pane card"
            style={{
              marginTop: '1%',
            }}
            >
            <div className="heading">
              <h2 className="header">STATS</h2>
            </div>
            <div
              className="r-around"
              style={{
                height: '75%',
              }}
            >
              <StatBlock
                name="Questions"
                number={questions.length}
                isMini
              />
              <StatBlock
                name="Responses"
                number={calculateNumberResponses(questions)}
                isMini
              />
            </div>
          </div>
        </div>
        <div className="right-pane card">
          <div className="heading">
            <h2 className="header">MOST RECENT</h2>
          </div>
          <div
            style={{
              overflowY: "auto",
            }}
          >
            {isCourseSessionActive
              ? mostRecentQuestions.map((q) => (
              <QuestionResponse
                isQuestion
                key={q.id}
                created={q.created}
                rank={getRank(q.votes)}
                depthRestriction={2}
                content={q.content}
                responses={q.responses}
              />
            ))
              : null
            }
          </div>
        </div>
      </div>
    );
  }
};

const stateToProps = (state) => ({
  isCourseSessionActive: !!state.Course.activeCourseSessionId,
  activeCourseSessionId: state.Course.activeCourseSessionId,
  questions: state.QuestionList,
  mostVotedQuestions: filterQuestions(
    'MOST_VOTED',
    state.QuestionList,
  ),
  mostRecentQuestions: filterQuestions(
    'MOST_RECENT',
    state.QuestionList,
  ),
});

const dispatchToProps = (dispatch) => ({
  receivedQuestions: (questions) => {
    dispatch(AskActions.receivedQuestions(questions));
  },
  questionRemove: (id) => {
    dispatch(QuestionsActions.questionRemove(id))
  },
  responseRemove: (id) => {
    dispatch(QuestionsActions.responseRemove(id));
  }
});


Ask = connect(
  stateToProps,
  dispatchToProps,
)(Ask);

export default Ask;
