/**
 * @author Anthony Altieri on 10/9/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../../../api/Questions';
import Question from './QuestionList/Question';
import * as AskActions from '../../../../actions/DashInstructor/Ask'
import StatBlock from './StatBlock';

const filterQuestions = (filter, questions) => {
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

class Ask extends Component {
  componentDidMount() {
    const { isCourseSessionActive, courseSessionId, dispatch,
      retrievedMostVoted, retrievedMostRecent
    } = this.props;
    if (isCourseSessionActive) {
      fetchQuestions(courseSessionId)
        .then((questions) => {
          const topTenMostVoted = filterQuestions('MOST_VOTED', questions).slice(0, 10)
          retrievedMostVoted(topTenMostVoted);
          const mostRecent = filterQuestions('MOST_RECENT', questions).slice(0, 10);
          retrievedMostRecent(mostRecent)
        })
    }

  }

  render() {
    const { isCourseSessionActive, mostVotedQuestions,
      mostRecentQuestions,
    } = this.props;
    return (
      <div className="ask r">
        <div className="left-pane c">
          <div className="most-voted">
            <div className="heading">
              <h2 className="header">MOST VOTED</h2>
            </div>
            {isCourseSessionActive ?
              mostVotedQuestions.map((q) => {
                return <Question
                  content={q.content}
                  rank={q.rank}
                />})
              : null
            }
          </div>
          <div className="stats">
            <div className="heading">
              <h2 className="header">STATS</h2>
            </div>
            <div className="r" id="stat-row">
              <StatBlock />
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="heading">
            <h2 className="header">MOST RECENT</h2>
          </div>
          {isCourseSessionActive
            ? mostRecentQuestions.map((q) => {
              return <Question
                content={q.content}
                rank={q.rank}
              />})
            : null
          }
        </div>
      </div>
    );
  }
};

const stateToProps = (state) => ({
  mostVotedQuestions: state.DashInstructor.Ask.mostVoted,
  mostRecentQuestions: state.DashInstructor.Ask.mostRecent,
});

const dispatchToProps = (dispatch) => ({
  retrievedQuestions: (questions) => {
    dispatch()
  },
  retrievedMostVoted: (mostVoted) => {
    dispatch(AskActions.retrievedMostVoted(mostVoted))
  },
  retrievedMostRecent: (mostRecent) => {
    dispatch(AskActions.retrievedMostRecent(mostRecent));
  },
});


Ask = connect(
  stateToProps,
  dispatchToProps,
)(Ask);

export default Ask;
