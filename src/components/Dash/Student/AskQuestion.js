/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { modifiedEnteredQuestion, clearEnteredQuestion }
  from '../../../actions/Dash/Student';
import ButtonRound from '../../../components/buttons/ButtonRound';

let AskQuestion = ({
  dispatch,
  question,
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
            dispatch(clearEnteredQuestion());
          }}
        >
          SUBMIT
        </ButtonRound>
      </div>
      <div className="container-input">
        <textarea
          className="input"
          placeholder="Enter your question here..."
          defaultValue={question}
          ref={(n) => {
            input = n ;
          }}
          onChange={(event) => {
              enteredQuestion = event.target.value;
              console.log('onChange')
              dispatch(modifiedEnteredQuestion(enteredQuestion));
           }}
        />
      </div>

    </div>
  );
};
const stateToProps = (state) => ({
  question: state.Dash.Student.enteredQuestion || '',
});

AskQuestion = connect(
  stateToProps,
)(AskQuestion);

export default AskQuestion;
