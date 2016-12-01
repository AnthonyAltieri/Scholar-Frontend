/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { typedQuestion } from '../../../actions/CourseSession';
import { questionSubmitSuccess } from '../../../actions/DashStudent';
import ButtonRound from '../../../components/buttons/ButtonRound';

let AskQuestion = ({
  dispatch,
  questionSoFar,
}) => {
  let input;
  let enteredQuestion = '';

  return (
    <div className="ask-question">
      <div
        className="r-center"
      >
        <ButtonRound
          onClick={() => {
            // Todo: submit the question with server
            dispatch(questionSubmitSuccess());
          }}
        >
          SUBMIT
        </ButtonRound>
      </div>
      <div className="container-input">
        <textarea
          className="input"
          placeholder="Enter your question here..."
          ref={(n) => {
            input = n ;
          }}
          onChange={(event) => {
              enteredQuestion = event.target.value;
              dispatch(typedQuestion(enteredQuestion));
           }}
        >
          {questionSoFar}
        </textarea>
      </div>

    </div>
  );
};
const stateToProps = (state) => ({
  questionSoFar: state.CourseSession.enteredQuestion,
});

AskQuestion = connect(
  stateToProps,
)(AskQuestion);

export default AskQuestion;