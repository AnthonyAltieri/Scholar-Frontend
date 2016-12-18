import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import RedRaisedButton from '../../buttons/RedRaisedButton';
import { toastr } from 'react-redux-toastr';
import GreenRaisedButton from '../../buttons/GreenRaisedButton';
import * as InstantApi  from '../../../api/Assessment/Instant';
import * as ReflectiveApi from '../../../api/Assessment/Reflective';
import { connect } from 'react-redux';
import * as DashStudentActions from '../../../actions/DashStudent';
import * as StudentActions from '../../../actions/Dash/Student';
import * as ReflectiveActions from '../../../actions/Assess/Reflelctive';


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
  courseSessionId,
  userId,
  assessmentId,
  courseId,
  enteredAnswer,
  modifiedEnteredAnswer,
  reflectiveAnswered,
}) => {
  let input = '';
  return (
    <div>
      <RaisedButton
        label="submit"
        secondary
        fullWidth
        onTouchTap={async () => {
          try {
            const payload = await ReflectiveApi
              .answer(
                courseSessionId,
                userId,
                assessmentId,
                courseId,
                enteredAnswer,
              );
            if (!!payload.error) {
              toastr.error('Something went wrong please try again');
              return;
            }
            reflectiveAnswered();
          } catch (e) {
            console.error('[ERROR] Assessment submit', e);
            toastr.error('Something went wrong please try again');
          }
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
            enteredAnswer = e.target.value;
            modifiedEnteredAnswer(enteredAnswer);
          }}
        />
      </div>
    </div>
  );
}

const Response = ({
  text,
  onAgreeClick,
  onDisagreeClick,
}) => {
  return (
    <div className="response">
      <p className="text">{text}</p>
      <div className="buttons">
        <RedRaisedButton
          label="Disagree"
          onTouchTap={onDisagreeClick}
          style={{
            width: 120,
          }}
        />
        <GreenRaisedButton
          label="Agree"
          onTouchTap={onAgreeClick}
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
  courseSessionId,
  courseId,
  userId,
  reflectiveReview,
}) => {
  return (
    <div
      className={'reflective-review ' +
      (responses.length === 0
        ? 'c-center fullheight'
        : '')
      }
    >
      {responses.length === 0
        ? <p className="placeholder">Nothing to review right now...</p>
        : null
      }
      {responses
        .reduce((a, c, i) => ([...a, {...c, i, }]), [])
        .map((r) => (
          <Response
            key={`${r.i}()()${r.content}`}
            text={r.content}
            onAgreeClick={async () => {
              try {
                const payload = await ReflectiveApi
                  .review(
                    courseSessionId,
                    courseId,
                    userId,
                    'CORRECT',
                    answerId,
                  )
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                reflectiveReview(r.i);
              } catch (e) {
                console.error('[ERROR] onCorrectClick', e);
                toastr.error('Something went wrong please try again');
              }
            }}
            onDisagreeClick={async () => {
              try {
                const payload = await ReflectiveApi
                  .review(
                    courseSessionId,
                    courseId,
                    userId,
                    'CORRECT',
                    answerId,
                  )
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                reflectiveReview(r.i);
              } catch (e) {
                console.error('[ERROR] onIncorrectClick', e);
                toastr.error('Something went wrong please try again');
              }
            }}
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
      toReview,
      hasAnsweredReflective,
      reflectiveAnswered,
      answerId,
      hasStartedReview,
      reflectiveReview,
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
        if (!hasAnsweredReflective && !hasStartedReview) {
          displayedAssessment = (
            <div>
              <ReflectiveRespond
                modifiedEnteredAnswer={modifiedEnteredAnswer}
                enteredAnswer={enteredAnswer}
                courseSessionId={courseSessionId}
                userId={userId}
                assessmentId={assessmentId}
                courseId={courseId}
                reflectiveAnswered={reflectiveAnswered}
              />
              <Question question={question} />
            </div>
          )
        } else {
          displayedAssessment = (
            <ReflectiveReview
              responses={responses}
              toReview={toReview}
              courseSessionId={courseSessionId}
              courseId={courseId}
              userId={userId}
              answerId={answerId}
              reflectiveReview={reflectiveReview}
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
  hasAnsweredReflective: !!state.Assess.Reflective.hasAnswered,
  toReview: state.Assess.Reflective.toReview || [],
  hasStartedReview: state.Assess.Reflective.hasStartedReview || false,
  responses: state.Assess.Reflective.toReview || [],
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
  reflectiveAnswered: () => {
    dispatch(ReflectiveActions.answered());
  },
  reflectiveReview: (reviewIndex) => {
    dispatch(ReflectiveActions.review(reviewIndex));
  },
});

Assessment = connect(
  stateToProps,
  dispatchToProps,
)(Assessment);

export default Assessment;
