/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { questionSubmitSuccess } from '../../actions/DashStudent';
import ButtonRound from '../../components/buttons/ButtonRound.jsx';

let AskQuestion = ({
  dispatch,
}) => {
  let input;

  return (
    <div className="ask-question">
      <div className="r-center">
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
          ref={(n) => { input = n }}
        >
        </textarea>
      </div>

    </div>
  );
};
AskQuestion = connect()(AskQuestion);

export default AskQuestion;