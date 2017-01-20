/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { modifiedEnteredQuestion, clearEnteredQuestion }
  from '../../../actions/Dash/Student';
import { setDashMode } from '../../../actions/DashStudent';
import ButtonRound from '../../../components/buttons/ButtonRound';
import RaisedButton from 'material-ui/RaisedButton';
import { create } from '../../../api/Question';
import { checkSimilarity } from '../../../api/Questions';


let AskQuestion = ({
  dispatch,
  question,
  userId,
  courseId,
  courseSessionId,
  questionList
}) => {
  let input;
  let enteredQuestion = '';
  return (
    <div className="ask-question">
      <div
        className="r-center"
      >
        <RaisedButton
          label="submit"
          secondary
          style={{
            marginTop: 12,
            marginBottom: 2,
          }}
          id="ask-question-button"
          onClick={async function() {
            const content = input.value;
            if (!content.trim()) {
              toastr.info('A question has to have some content');
              return;
            }
            try {
              const similarityIndex = -1;
			    //await checkSimilarity(content, questionList);
              if(!!similarityIndex && similarityIndex > -1){
                toastr.info("Found a similar Question with content : " + questionList[similarityIndex].content);
                dispatch(clearEnteredQuestion());
                dispatch(setDashMode('QUESTIONS'));
                //TODO: Add vote on this question Index
                return;
              }

              const payload = await create(
                userId,
                content,
                courseId,
                courseSessionId,
              );
              if (!!payload.error) {
                toastr.error('Something went wrong please try again')
                return;
              }
              dispatch(clearEnteredQuestion());
              dispatch(setDashMode('QUESTIONS'));
              // input.value = '';
            } catch (e) {
              console.error('[ERROR] onClick', e);
              toastr.error('Something went wrong please try again')
              return;
            }
          }}
        />
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
      <h1 className="ask-a-question">Ask A Question</h1>

    </div>
  );
};
const stateToProps = (state) => ({
  userId: state.User.id,
  courseId: state.Course.id,
  courseSessionId: state.Course.activeCourseSessionId,
  question: state.Dash.Student.enteredQuestion || '',
  questionList: state.QuestionList
});

AskQuestion = connect(
  stateToProps,
)(AskQuestion);

export default AskQuestion;
