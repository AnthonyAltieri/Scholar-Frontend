import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RedRaisedButton from '../../buttons/RedRaisedButton';
import GreenRaisedButton from '../../buttons/GreenRaisedButton';
import * as InstantApi  from '../../../api/Assessment/Instant';
import { connect } from 'react-redux';
import * as DashStudentActions from '../../../actions/DashStudent';
import * as StudentActions from '../../../actions/Dash/Student';


function indexToLetter(index) {
  switch (index) {
    case 0: { return 'A'; }
    case 1: { return 'B'; }
    case 2: { return 'C'; }
    case 3: { return 'D'; }
    case 4: { return 'E'; }
    default: {
      throw new Error(`Invalid index for letter ${index}`);
    }
  }
}

const Choice = ({
  letter,
  onClick,
  text,
  isActive,
}) => (
  <div className={'choice' + (!!isActive ? ' active' : '')}>
    <div
      className="r-between fullwidth"
      style={{
        paddingLeft: 12,
        paddingRight: 12,
      }}
      >
      <p className="text">{text}</p>
      <div
        className={'letter-box' + (!!isActive ? ' active' : '')}
        onClick={onClick}
      >
        <p
          className="letter"
        >
          {letter}
        </p>

      </div>
    </div>
  </div>
);

const Instant = ({
  options,
  selectedOption,
  userId,
  courseSessionId,
  selectOption,
  assessmentId,
  courseId,
}) => {
  const usedOptions = options.length > 0
    ? options
    : ['','','','',''];

  return (
    <div>
      {usedOptions
        .reduce((a, c, i) => [...a, { c, i }], [])
        .map((o) => (
        <Choice
          key={`${o.i}-><-${o.c}`}
          letter={indexToLetter(o.i)}
          onClick={async () => {
            try {
              const payload = await InstantApi.answer(
                courseSessionId,
                userId,
                assessmentId,
                courseId,
                o.i
              );
              const { error } = payload;
              if (!!error) {
                toastr.error('Something went wrong please try again');
                return;
              }
              selectOption(o.i);
            } catch (e) {
              console.error('[ERROR] selectOption', e);
              toastr.error('Something went wrong please try again');
            }
          }}
          isActive={o.i === selectedOption}
          text={o.c}
        />
      ))}

    </div>
  );
}

const ReflectiveRespond = ({
  enteredAnswer,
  modifiedEnteredAnswer,
}) => {
  let input = '';
  return (
    <div>
      <RaisedButton
        label="submit"
        secondary
        fullWidth
        onClick={async () => {
        }}
      />
      <div className="container-input">
        <textarea
          className="input"
          placeholder="Enter your answwer here..."
          defaultValue={enteredAnswer}
          ref={(n) => {
            input = n;
          }}
          onChange={(e) => {
            enteredAnswer = event.target.value;
            modifiedEnteredAnswer(enteredAnswer);
          }}
        />
      </div>
    </div>
  );
}

const Response = ({
  text,
  onCorrectClick,
  onIncorrectClick,
}) => {
  return (
    <div className="response">
      <p className="text">{text}</p>
      <div className="buttons">
        <RedRaisedButton
          label="incorrect"
          onClick={onIncorrectClick}
          style={{
            width: 120,
          }}
        />
        <GreenRaisedButton
          label="correct"
          onClick={onCorrectClick}
          style={{
            width: 120,
          }}
        />
      </div>
    </div>
  );
}
const ReflectiveReview = ({
  responses,
}) => {
  return (
    <div>
      {responses
        .reduce((a, c, i) => [...a, { c, i }], [])
        .map((r) => (
          <Response
            key={`${r.i}()()${r.c}`}
            text={r.c}
          />

        ))
      }
    </div>
  );
}

const Question = ({
  question,
}) => {
  return (
    <div>
      <p className="assessment-question">
        <span>Q:</span>{question}
      </p>
    </div>
  );
}

class Assessment extends Component {
  componentDidMound() {
    const {
      isAssessmentActive,
      setDashMode,
    } = this.props;
    // if (!isAssessmentActive) {
    //   setDashMode('QUESTIONS');
    //   return;
    // }
  }


  render() {
    const {
      isAssessmentActive,
      assessmentType,
      isInRespondMode,
      question,
      options,
      selectedOption,
      selectOption,
      enteredAnswer,
      modifiedEnteredAnswer,
      courseSessionId,
      userId,
      assessmentId,
      responses,
      courseId,
    } = this.props;
    let displayedAssessment = null;
    console.log('question', question);

    if (isAssessmentActive) {
      if (assessmentType === 'INSTANT') {
        displayedAssessment = (
          <div>
            <Instant
              options={options}
              selectedOption={selectedOption}
              selectOption={selectOption}
              courseSessionId={courseSessionId}
              userId={userId}
              assessmentId={assessmentId}
              courseId={courseId}
            />
            <Question question={question} />
          </div>
        )
      } else if (assessmentType === 'REFLECTIVE') {
        if (!!isInRespondMode) {
          displayedAssessment = (
            <div>
              <ReflectiveRespond
                modifiedEnteredAnswer={modifiedEnteredAnswer}
                enteredAnswer={enteredAnswer}
              />
              <Question question={question} />
            </div>
          )
        } else {
          displayedAssessment = (
            <ReflectiveReview
              responses={responses}
            />
          )
        }
      } else {
        throw new Error(`Invalid assessmentType ${assessmentType}`);
      }
    }


    let input = '';
    return (
      <div className="assessment">
        {displayedAssessment}
      </div>
    );
  }

}

const stateToProps = (state) => ({
  assessmentType: state.Assess.activeType,
  isAssessmentActive: !!state.Assess.activeType,
  enteredAnswer: state.Dash.Student.enteredAnswer,
  selectedOption: state.Dash.Student.selectedOption,
  options: state.Assess.Instant.options,
  courseSessionId: state.Course.activeCourseSessionId,
  userId: state.User.id,
  assessmentId: state.Assess.activeAssessmentId,
  courseId: state.Course.id,
  question: state.Assess.question || 'Verbal/Slide question asked',
});

const dispatchToProps = (dispatch) => ({
  setDashMode: (mode) => {
    dispatch(DashStudentActions.setDashMode(mode));
  },
  modifiedEnteredAnswer: (enteredAnswer) => {
    dispatch(StudentActions.modifiedEnteredAnswer(enteredAnswer))
  },
  selectOption: (selectedOption) => {
    dispatch(StudentActions.selectOption(selectedOption));
  },
});

Assessment = connect(
  stateToProps,
  dispatchToProps,
)(Assessment);

export default Assessment;
