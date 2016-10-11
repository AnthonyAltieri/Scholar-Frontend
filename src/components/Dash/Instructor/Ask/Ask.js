/**
 * @author Anthony Altieri on 10/9/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../../api/Questions';
import Question from './QuestionList/Question';

class Ask extends Component {
  componentDidMount() {
    const { isCourseSessionActive, courseSessionId, dispatch
    } = this.props;
    fetchQuestions(courseSessionId)
      .then((questions) => {
      })

  }

  render() {
    return (
      <div className="ask r">
        <div className="left-pane c">
          <div className="most-voted">
            <div className="heading">
              <h2 className="header">MOST VOTED</h2>
            </div>
            <Question
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <Question
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </div>
          <div className="stats">
            <div className="heading">
              <h2 className="header">STATS</h2>
            </div>
            <div className="r">
            </div>
          </div>
        </div>
        <div className="right-pane">
          <div className="heading">
            <h2 className="header">MOST RECENT</h2>
          </div>
        </div>
      </div>
    );
  }
};

const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
  retrievedQuestions: (questions) => {
    dispatch()
  },
});


Ask = connect(
  stateToProps,
  dispatchToProps,
)(Ask);

export default Ask;
